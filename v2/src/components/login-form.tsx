"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/advoga-ui/button/button";
import { InputField } from "@/components/advoga-ui/input/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entre na sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seu email e senha para acessar
        </p>
      </div>
      <div className="grid gap-6">
        <InputField
          label="Email"
          type="email"
          placeholder="seu@email.com"
          required
          leftIcon={Mail}
          className="w-full sm:max-w-none"
        />
        <div className="grid gap-2">
          <InputField
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            required
            leftIcon={Lock}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
            className="w-full sm:max-w-none"
          />
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm underline-offset-4 hover:underline cursor-pointer text-input-label"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          size="md"
        >
          Entrar
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou continue com
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full cursor-pointer hover:bg-muted/50 hover:text-foreground"
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer hover:bg-muted/50 hover:text-foreground"
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path
                d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"
                fill="#00ADEF"
              />
              <path d="M3 3h8v8H3V3z" fill="#FF5722" />
              <path d="M13 3h8v8h-8V3z" fill="#4CAF50" />
              <path d="M3 13h8v8H3v-8z" fill="#FFC107" />
              <path d="M13 13h8v8h-8v-8z" fill="#00ADEF" />
            </svg>
            Microsoft
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <a href="#" className="underline underline-offset-4 cursor-pointer">
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
