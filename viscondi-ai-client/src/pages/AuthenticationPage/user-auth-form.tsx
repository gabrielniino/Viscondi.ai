import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';
import { Message } from '@/components/Message';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);

    useEffect(() => {
        if (registrationStatus) {
            const timer = setTimeout(() => {
                setRegistrationStatus(null); // Limpa a mensagem após 3 segundos
            }, 3000);

            return () => {
                clearTimeout(timer); // Limpa o timer ao desmontar o componente
            };
        }
    }, [registrationStatus]);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        // Verifica se os campos de email e senha estão preenchidos
        if (!email || !password) {
            setRegistrationStatus('Os campos de email e senha são obrigatórios.');
            return;
        }

        setName('');
        setIsLoading(true);

        // Prepare os dados do usuário para enviar ao servidor
        const userData = { name, email, password };
        
        try {
            const response = await fetch('http://localhost:3333/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setRegistrationStatus('Usuário registrado com sucesso');
            } else {
                const data = await response.json();
                setRegistrationStatus(data.message || 'Erro no registro');
                console.log(`data.message: ${data.message}`)
            }
        } catch (error) {
            console.error(error);
            setRegistrationStatus('Erro no servidor');
        } finally {
            setIsLoading(false);
        };
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
                        <Link to="/login">Registrar</Link>
                    </Button>
                </div>
            </form>
            {/* Mensagem de sucesso ou erro */}
            {registrationStatus && (
                <Message
                    message={registrationStatus}
                    onClose={() => setRegistrationStatus(null)}
                    type={registrationStatus.includes('sucesso') ? 'success' : 'error'}
                />
            )}
        </div>
    );
}
