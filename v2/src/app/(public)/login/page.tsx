"use client";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Entrar</h1>
          <p className="mt-2 text-muted-foreground">
            Faça login para acessar sua conta
          </p>
        </div>
        {/* TODO: Implementar form de login */}
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            Formulário de login em breve...
          </p>
        </div>
      </div>
    </div>
  );
}
