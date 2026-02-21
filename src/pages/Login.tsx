import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, LogIn } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, isLoading: authLoading } = useAuth();

    // Se já logado, redireciona
    useEffect(() => {
        if (!authLoading && user) {
            redirectByRole(user);
        }
    }, [user, authLoading]);

    const redirectByRole = async (u: typeof user) => {
        if (!u) return;
        // Verificar na tabela candidatos se é cuidador
        const { data: candidato } = await supabase
            .from("candidatos_cuidadores_rows")
            .select("id")
            .eq("email", u.email ?? "")
            .maybeSingle();

        if (candidato) {
            navigate("/painel-cuidador");
        } else {
            navigate("/client-dashboard");
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-careconnect-blue border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            toast({
                title: "Login realizado com sucesso!",
                description: "Bem-vindo ao CareConnect.",
            });

            // Redirecionar conforme perfil
            await redirectByRole(data.user);
        } catch (error: any) {
            toast({
                title: "Erro ao fazer login",
                description: error.message === "Invalid login credentials"
                    ? "Email ou senha incorretos. Verifique seus dados."
                    : error.message || "Ocorreu um erro. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-careconnect-blue">
                            Care<span className="text-careconnect-green">Connect</span>
                        </h1>
                        <p className="text-gray-500 mt-1">Acesse sua conta</p>
                    </Link>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                            <LogIn className="w-5 h-5" />
                            Entrar na plataforma
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********"
                                        required
                                        autoComplete="current-password"
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-careconnect-blue hover:bg-careconnect-blue/90 h-11"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center space-y-3">
                            <p className="text-sm text-gray-600">
                                É cuidador e ainda não tem conta?{" "}
                                <Link
                                    to="/pre-cadastro"
                                    className="text-careconnect-blue font-medium hover:underline"
                                >
                                    Cadastre-se aqui
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600">
                                <Link to="/" className="text-gray-500 hover:underline">
                                    ← Voltar ao site
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
