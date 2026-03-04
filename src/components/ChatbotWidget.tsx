import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface LeadInfo {
    nome: string;
    whatsapp: string;
    cidade: string;
}

const WEBHOOK_URL = import.meta.env.DEV
    ? "/api/n8n/webhook/site"
    : "https://dyxkbbojlyppizsgjjxx.supabase.co/functions/v1/n8n-proxy";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eGtiYm9qbHlwcGl6c2dqanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NjAsImV4cCI6MjA2MzY1MDY2MH0.47pGkZXkqZoAsjVHhwSQPLEcGY99hoiDO-6LdCG-4K4";

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCta, setShowCta] = useState(true);

    // Etapa: "lead" = formulário | "chat" = conversa
    const [etapa, setEtapa] = useState<"lead" | "chat">("lead");
    const [lead, setLead] = useState<LeadInfo>({ nome: "", whatsapp: "", cidade: "" });
    const [leadLoading, setLeadLoading] = useState(false);
    const [leadErrors, setLeadErrors] = useState<Partial<LeadInfo>>({});

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(
        () => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const nomeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (etapa === "lead") nomeRef.current?.focus();
                else inputRef.current?.focus();
            }, 150);
        }
    }, [isOpen, etapa]);

    // Validação do formulário de lead
    const validateLead = () => {
        const errors: Partial<LeadInfo> = {};
        if (!lead.nome.trim()) errors.nome = "Informe seu nome";
        const wpp = lead.whatsapp.replace(/\D/g, "");
        if (!wpp || wpp.length < 10) errors.whatsapp = "WhatsApp inválido";
        if (!lead.cidade.trim()) errors.cidade = "Informe a cidade";
        setLeadErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Formatar WhatsApp enquanto digita
    const formatWhatsapp = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    // Submeter formulário de lead e iniciar conversa
    const handleLeadSubmit = async () => {
        if (!validateLead()) return;
        setLeadLoading(true);

        try {
            // Enviar dados iniciais do lead para o n8n
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({
                    sessionId,
                    leadNome: lead.nome.trim(),
                    leadWhatsapp: lead.whatsapp,
                    leadCidade: lead.cidade.trim(),
                    message: `Olá! Meu nome é ${lead.nome.trim()}, meu WhatsApp é ${lead.whatsapp} e estou em ${lead.cidade.trim()}.`,
                    chatInput: `Olá! Meu nome é ${lead.nome.trim()}, meu WhatsApp é ${lead.whatsapp} e estou em ${lead.cidade.trim()}.`,
                    timestamp: new Date().toISOString(),
                }),
            });

            let welcomeText = `Olá, **${lead.nome.trim()}**! 😊 Que bom ter você aqui!\n\nSou o **Encontre um cuidador**, assistente virtual do CareConnect 💚\n\nComo posso ajudar você a encontrar o profissional ideal para sua família?`;

            if (response.ok) {
                const ct = response.headers.get("content-type") || "";
                if (ct.includes("application/json")) {
                    const data = await response.json();
                    const resposta =
                        data?.output ||
                        data?.message ||
                        data?.text ||
                        data?.reply ||
                        (Array.isArray(data) && (data[0]?.output || data[0]?.message || data[0]?.text));
                    if (resposta) welcomeText = resposta;
                }
            }

            setMessages([
                {
                    id: "welcome",
                    role: "assistant",
                    content: welcomeText,
                },
            ]);
            setEtapa("chat");
        } catch {
            // Mesmo com erro no n8n, avança para o chat com mensagem padrão
            setMessages([
                {
                    id: "welcome",
                    role: "assistant",
                    content: `Olá, **${lead.nome.trim()}**! 😊 Bem-vindo ao CareConnect!\n\nSou o **Encontre um cuidador**, seu assistente virtual 💚\n\nComo posso ajudar você a encontrar o profissional ideal?`,
                },
            ]);
            setEtapa("chat");
        } finally {
            setLeadLoading(false);
        }
    };

    const handleLeadKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLeadSubmit();
    };

    // Enviar mensagem no chat
    const sendMessage = async () => {
        const text = inputValue.trim();
        if (!text || isLoading) return;

        const userMsg: Message = { id: `u_${Date.now()}`, role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({
                    sessionId,
                    leadNome: lead.nome.trim(),
                    leadWhatsapp: lead.whatsapp,
                    message: text,
                    chatInput: text,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const ct = response.headers.get("content-type") || "";
            let replyText = "Desculpe, não entendi. Pode repetir?";

            if (ct.includes("application/json")) {
                const data = await response.json();
                replyText =
                    data?.output ||
                    data?.message ||
                    data?.text ||
                    data?.reply ||
                    data?.response ||
                    (Array.isArray(data) && (data[0]?.output || data[0]?.message || data[0]?.text)) ||
                    replyText;
            } else {
                const t = await response.text();
                if (t) replyText = t;
            }

            setMessages((prev) => [
                ...prev,
                { id: `a_${Date.now()}`, role: "assistant", content: replyText },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: `e_${Date.now()}`,
                    role: "assistant",
                    content: "Ops! Tive um problema técnico. Tente novamente em instantes.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChatKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const fmt = (text: string) =>
        text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />");

    return (
        <>
            {/* Bolha CTA */}
            {!isOpen && showCta && (
                <div className="fixed bottom-[4.75rem] right-4 z-50 animate-in slide-in-from-right-4 fade-in duration-500">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowCta(false); }}
                        className="absolute -top-2 -left-2 w-5 h-5 bg-gray-400 hover:bg-gray-500 text-white rounded-full text-xs flex items-center justify-center transition-colors z-10"
                        aria-label="Fechar aviso"
                    >
                        ✕
                    </button>
                    <button
                        onClick={() => { setIsOpen(true); setShowCta(false); }}
                        className="bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 px-4 py-3 text-left hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 max-w-[220px]"
                    >
                        <p className="text-xs font-bold text-careconnect-blue leading-tight">
                            🤖 Sou o Encontre um cuidador, IA da CareConnect!
                        </p>
                        <p className="text-xs text-gray-600 mt-1 leading-snug">
                            Encontre o cuidador ideal para sua família agora 👇
                        </p>
                        <p className="text-[10px] text-careconnect-green font-semibold mt-1.5">
                            Clique para conversar →
                        </p>
                    </button>
                </div>
            )}

            {/* Janela do Chat */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
                    style={{ height: "520px" }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-careconnect-blue to-careconnect-green p-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Encontre um cuidador</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                    <p className="text-white/80 text-xs">Assistente CareConnect</p>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/10 h-8 w-8 rounded-full"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* ── ETAPA 1: Formulário de Lead ── */}
                    {etapa === "lead" && (
                        <div className="flex-1 flex flex-col justify-center p-6 bg-gray-50">
                            <div className="text-center mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-careconnect-blue to-careconnect-green rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <Bot className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Olá! Sou o Encontre um cuidador 👋</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Para te ajudar melhor, me conta quem é você?
                                </p>
                            </div>

                            <div className="space-y-3">
                                {/* Nome */}
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                        Seu nome <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            ref={nomeRef}
                                            value={lead.nome}
                                            onChange={(e) => {
                                                setLead((p) => ({ ...p, nome: e.target.value }));
                                                setLeadErrors((p) => ({ ...p, nome: undefined }));
                                            }}
                                            onKeyDown={handleLeadKeyDown}
                                            placeholder="Ex: Maria Silva"
                                            className={`pl-9 h-10 text-sm rounded-xl border ${leadErrors.nome ? "border-red-400 focus:ring-red-300" : "border-gray-200"}`}
                                        />
                                    </div>
                                    {leadErrors.nome && (
                                        <p className="text-xs text-red-500 mt-1">{leadErrors.nome}</p>
                                    )}
                                </div>

                                {/* WhatsApp */}
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                        WhatsApp <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            value={lead.whatsapp}
                                            onChange={(e) => {
                                                setLead((p) => ({ ...p, whatsapp: formatWhatsapp(e.target.value) }));
                                                setLeadErrors((p) => ({ ...p, whatsapp: undefined }));
                                            }}
                                            onKeyDown={handleLeadKeyDown}
                                            placeholder="(11) 99999-9999"
                                            className={`pl-9 h-10 text-sm rounded-xl border ${leadErrors.whatsapp ? "border-red-400 focus:ring-red-300" : "border-gray-200"}`}
                                            inputMode="tel"
                                        />
                                    </div>
                                    {leadErrors.whatsapp && (
                                        <p className="text-xs text-red-500 mt-1">{leadErrors.whatsapp}</p>
                                    )}
                                </div>

                                {/* Cidade */}
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                        Cidade <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            value={lead.cidade}
                                            onChange={(e) => {
                                                setLead((p) => ({ ...p, cidade: e.target.value }));
                                                setLeadErrors((p) => ({ ...p, cidade: undefined }));
                                            }}
                                            onKeyDown={handleLeadKeyDown}
                                            placeholder="Ex: São Paulo - SP"
                                            className={`pl-9 h-10 text-sm rounded-xl border ${leadErrors.cidade ? "border-red-400 focus:ring-red-300" : "border-gray-200"}`}
                                        />
                                    </div>
                                    {leadErrors.cidade && (
                                        <p className="text-xs text-red-500 mt-1">{leadErrors.cidade}</p>
                                    )}
                                </div>

                                <Button
                                    onClick={handleLeadSubmit}
                                    disabled={leadLoading}
                                    className="w-full h-11 rounded-xl bg-gradient-to-r from-careconnect-blue to-careconnect-green text-white font-semibold text-sm hover:opacity-90 transition-opacity mt-1"
                                >
                                    {leadLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    {leadLoading ? "Iniciando conversa..." : "Começar conversa 💬"}
                                </Button>
                            </div>

                            <p className="text-center text-[10px] text-gray-400 mt-4">
                                🔒 Seus dados são usados apenas para atendimento
                            </p>
                        </div>
                    )}

                    {/* ── ETAPA 2: Chat ── */}
                    {etapa === "chat" && (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === "user"
                                                ? "bg-careconnect-blue"
                                                : "bg-gradient-to-br from-careconnect-blue to-careconnect-green"
                                                }`}
                                        >
                                            {msg.role === "user" ? (
                                                <User className="w-3.5 h-3.5 text-white" />
                                            ) : (
                                                <Bot className="w-3.5 h-3.5 text-white" />
                                            )}
                                        </div>
                                        <div
                                            className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-careconnect-blue text-white rounded-tr-sm"
                                                : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}
                                        />
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-careconnect-blue to-careconnect-green flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                                            <div className="flex gap-1 items-center h-4">
                                                {[0, 150, 300].map((delay) => (
                                                    <span
                                                        key={delay}
                                                        className="w-2 h-2 bg-careconnect-blue/40 rounded-full animate-bounce"
                                                        style={{ animationDelay: `${delay}ms` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                                <div className="flex gap-2">
                                    <Input
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleChatKeyDown}
                                        placeholder="Digite sua mensagem..."
                                        disabled={isLoading}
                                        className="flex-1 rounded-full border-gray-200 bg-gray-50 focus:bg-white text-sm h-10"
                                    />
                                    <Button
                                        onClick={sendMessage}
                                        disabled={!inputValue.trim() || isLoading}
                                        size="icon"
                                        className="rounded-full bg-careconnect-blue hover:bg-careconnect-blue/90 h-10 w-10 flex-shrink-0"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-center text-[10px] text-gray-400 mt-2">
                                    Encontre um cuidador — IA do CareConnect • Powered by n8n
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Botão flutuante */}
            <button
                onClick={() => { setIsOpen((prev) => !prev); setShowCta(false); }}
                className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full shadow-xl bg-gradient-to-br from-careconnect-blue to-careconnect-green flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-careconnect-blue/30"
                aria-label={isOpen ? "Fechar chat" : "Abrir chat com Encontre um cuidador"}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <>
                        <MessageCircle className="w-7 h-7 text-white drop-shadow" />
                        <span className="absolute w-full h-full rounded-full bg-white/20 animate-ping" />
                        <span
                            className="absolute w-full h-full rounded-full border-2 border-white/40 animate-ping"
                            style={{ animationDelay: "400ms" }}
                        />
                    </>
                )}
            </button>
        </>
    );
};

export default ChatbotWidget;
