import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Fazer a solicitação de login
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Redirecionar o usuário para a página "home" após o login bem-sucedido
                window.location.href = '/home';
            } else {
                // Exibir mensagem de erro
                const data = await response.json();
                setError(data.message || 'Erro no login');
            }
        } catch (error) {
            console.error(error);
            setError('Erro no servidor');
        } finally {
            setIsLoading(false);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className={`grid gap-6 ${className}`} {...props}>
            <form onSubmit={onSubmit}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button disabled={isLoading}>
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
                        <Link to="/home">Entrar</Link>
                    </Button>
                </div>
            </form>
            {/* Mensagem de erro */}
            {error && <p>{error}</p>}
        </div>
    );
}
