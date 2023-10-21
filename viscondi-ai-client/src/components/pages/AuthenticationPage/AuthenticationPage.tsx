import { UserAuthForm } from "./user-auth-form";

export function AuthenticationPage() {
    return (
        <>
            <div className="container relative flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-screen">
                <a href="/" className="absolute right-4 top-4 md:right-8 md:top-8">
                    Login
                </a>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Viscondi.ai
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <footer className="text-sm">Gabriel Nino</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Crie a sua conta Viscondi.
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Digite seu e-mail abaixo para criar sua conta
                            </p>
                        </div>
                        <UserAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Ao clicar em continuar, você concorda com nossos{" "}
                            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                                Termos de serviço
                            </a>{" "}
                            e{" "}
                            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                                política de Privacidade
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}