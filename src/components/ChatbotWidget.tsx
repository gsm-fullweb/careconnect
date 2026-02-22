import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

// Em desenvolvimento usa o proxy Vite (evita CORS).
// Em produção usa a Edge Function Supabase como proxy server-to-server (sem CORS).
const WEBHOOK_URL = import.meta.env.DEV
    ? "/api/n8n/webhook/mila-site"
    : "https://dyxkbbojlyppizsgjjxx.supabase.co/functions/v1/n8n-proxy";

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCta, setShowCta] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Olá! Sou a **Mila**, assistente virtual do CareConnect 💚\n\nPosso te ajudar a encontrar o cuidador ideal para seu familiar. Como posso ajudar hoje?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(
        () => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        const text = inputValue.trim();
        if (!text || isLoading) return;

        const userMessage: Message = {
            id: `user_${Date.now()}`,
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    message: text,
                    chatInput: text,
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            // Tentar parsear como JSON, se não for JSON usa texto puro
            let replyText = "Desculpe, não consegui processar sua mensagem.";
            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
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
                const text = await response.text();
                if (text) replyText = text;
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: `assistant_${Date.now()}`,
                    role: "assistant",
                    content: replyText,
                    timestamp: new Date(),
                },
            ]);
        } catch (error) {
            console.error("Erro ao enviar mensagem para Mila:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: `error_${Date.now()}`,
                    role: "assistant",
                    content:
                        "Ops! Não consegui me conectar agora. Tente novamente em alguns instantes ou entre em contato via WhatsApp.",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatMessage = (text: string) =>
        text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />");

    return (
        <>
            {/* Janela do Chat */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
                    style={{ height: "520px" }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-careconnect-blue to-careconnect-green p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Mila</p>
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

                    {/* Mensagens */}
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
                                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                                />
                            </div>
                        ))}

                        {/* Indicador de digitação */}
                        {isLoading && (
                            <div className="flex gap-2">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-careconnect-blue to-careconnect-green flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                                    <div className="flex gap-1 items-center h-4">
                                        <span
                                            className="w-2 h-2 bg-careconnect-blue/40 rounded-full animate-bounce"
                                            style={{ animationDelay: "0ms" }}
                                        />
                                        <span
                                            className="w-2 h-2 bg-careconnect-blue/40 rounded-full animate-bounce"
                                            style={{ animationDelay: "150ms" }}
                                        />
                                        <span
                                            className="w-2 h-2 bg-careconnect-blue/40 rounded-full animate-bounce"
                                            style={{ animationDelay: "300ms" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex gap-2">
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
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
                            Mila — IA do CareConnect • Powered by n8n
                        </p>
                    </div>
                </div>
            )}

            {/* Bolha CTA — aparece quando o chat está fechado */}
            {!isOpen && showCta && (
                <div className="fixed bottom-[4.75rem] right-4 z-50 flex items-end gap-2 animate-in slide-in-from-right-4 fade-in duration-500">
                    {/* Botão fechar CTA */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowCta(false); }}
                        className="absolute -top-2 -left-2 w-5 h-5 bg-gray-400 hover:bg-gray-500 text-white rounded-full text-xs flex items-center justify-center transition-colors z-10"
                        aria-label="Fechar aviso"
                    >
                        ✕
                    </button>

                    {/* Balão de fala */}
                    <button
                        onClick={() => { setIsOpen(true); setShowCta(false); }}
                        className="bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 px-4 py-3 text-left hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 max-w-[220px]"
                    >
                        <p className="text-xs font-bold text-careconnect-blue leading-tight">
                            🤖 Sou a Mila, IA da CareConnect!
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

            {/* Botão flutuante */}
            <button
                onClick={() => { setIsOpen((prev) => !prev); setShowCta(false); }}
                className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full shadow-xl bg-gradient-to-br from-careconnect-blue to-careconnect-green flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-careconnect-blue/30"
                aria-label={isOpen ? "Fechar chat" : "Abrir chat com Mila"}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <>
                        <MessageCircle className="w-7 h-7 text-white drop-shadow" />
                        {/* Ping duplo para mais atenção */}
                        <span className="absolute w-full h-full rounded-full bg-white/20 animate-ping" />
                        <span className="absolute w-full h-full rounded-full border-2 border-white/40 animate-ping" style={{ animationDelay: "400ms" }} />
                    </>
                )}
            </button>
        </>
    );
};

export default ChatbotWidget;

