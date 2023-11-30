import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { useAuth } from '@/hooks/useAuth';

import { Message } from '@/components/Message';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onLoginSuccess?: (token: string, userId: string) => void;
}

export function UserLoginForm({ className, onLoginSuccess, ...props }: UserAuthFormProps) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
    };

    const handleCloseError = () => {
        setError(null);
    };

    const handleLoginError = (errorMessage: string) => {
        setError(errorMessage);
        setIsLoading(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                handleLoginError(data.error || 'Erro de autenticação');
                return;
            }

            const data = await response.json();

            if (data.token) {
                login({
                    isAuthenticated: true,
                    token: data.token,
                    id: data.userId,
                });

                if (data.isAuthenticated) {
                    onLoginSuccess?.(data.token, data.userId);
                } else {
                    handleLoginError('Credenciais inválidas');
                }
            } else {
                throw new Error('Token não recebido do servidor');
            }
        } catch (error) {
            console.error(error);
            handleLoginError('Erro de autenticação');
        } finally {
        }
    };

    return (
        <div className={`grid gap-6 ${className}`} {...props}>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            id="email"
                            placeholder="nome@exemplo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">Senha:</Label>
                        <Input
                            id="password"
                            placeholder="Digite sua senha"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <svg
                                className="mr-2 h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        )}
                        <span>Entrar</span>
                    </Button>
                </div>
            </form>
            {error && <Message message={error} onClose={handleCloseError} type='error' />}
        </div>
    );
}
