"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/advoga-ui/button/button";
import { InputField } from "@/components/advoga-ui/input/input";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/advoga-ui/input-otp";

type Step = "register" | "confirm";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    registerUser,
    confirmUserRegistration,
    resendConfirmationCode,
    isLoading,
  } = useAuth();

  const [step, setStep] = useState<Step>("register");

  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"success" | "error" | null>(null);

  async function onRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setMsgType(null);

    if (!firstname || !lastname || !email || !password) {
      setMsg("Preencha todos os campos.");
      setMsgType("error");
      return;
    }

    const res = await registerUser({
      username: email,
      password,
      profileType: "regular",
      firstname,
      lastname,
    });

    if (res.success) {
      setStep("confirm");
      setMsgType("success");
    } else {
      setMsg(res.message || "Não foi possível criar a conta.");
      setMsgType("error");
    }
  }
  const canConfirm = /^\d{6}$/.test(otp);

  async function onConfirmSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setMsgType(null);

    if (!/^\d{6}$/.test(otp)) {
      setMsg("Digite o código com 6 dígitos numéricos.");
      setMsgType("error");
      return;
    }

    const res = await confirmUserRegistration(email, otp);
    if (res.success) {
      setMsg("Conta confirmada com sucesso! Você já pode entrar.");
      setMsgType("success");
      // ex.: router.push("/login")
    } else {
      setMsg(res.message || "Não foi possível confirmar o código.");
      setMsgType("error");
    }
  }

  async function handleResend() {
    setMsg(null);
    setMsgType(null);
    const res = await resendConfirmationCode(email);
    if (res.success) {
      setMsg(`Código reenviado para ${email}.`);
      setMsgType("success");
    } else {
      setMsg(res.message || "Não foi possível reenviar o código.");
      setMsgType("error");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {step === "register" ? (
            <form
              className="p-6 md:p-8 w-full"
              onSubmit={onRegisterSubmit}
              noValidate
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Crie sua conta</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Informe seus dados para começar
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="firstname">Nome</Label>
                    <InputField
                      id="firstname"
                      type="text"
                      placeholder="Ana"
                      required
                      value={firstname}
                      onChange={(e) =>
                        setFirstname((e.target as HTMLInputElement).value)
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastname">Sobrenome</Label>
                    <InputField
                      id="lastname"
                      type="text"
                      placeholder="Souza"
                      required
                      value={lastname}
                      onChange={(e) =>
                        setLastname((e.target as HTMLInputElement).value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <InputField
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    leftIcon={Mail}
                    value={email}
                    onChange={(e) =>
                      setEmail((e.target as HTMLInputElement).value)
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <InputField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    required
                    leftIcon={Lock}
                    value={password}
                    onChange={(e) =>
                      setPassword((e.target as HTMLInputElement).value)
                    }
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
                  />
                </div>

                {msg && (
                  <p
                    className={cn(
                      "text-sm",
                      msgType === "error"
                        ? "text-input-text-error"
                        : "text-emerald-600"
                    )}
                  >
                    {msg}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="md"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando..." : "Criar conta"}
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Ou continue com
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full" type="button">
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

                  <Button variant="outline" className="w-full" type="button">
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

                <div className="text-center text-sm">
                  Já tem uma conta?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Entrar
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <form
              className="p-6 md:p-8 w-full space-y-6"
              onSubmit={onConfirmSubmit}
            >
              <Button
                type="button"
                variant="ghost"
                className="pl-0 text-primary w-fit"
                onClick={() => setStep("register")}
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>

              <div className="flex flex-col items-start text-left gap-1">
                <h1 className="text-xl font-bold">Confirme seu cadastro</h1>
                <p className="text-sm text-muted-foreground mt-2 text-left">
                  Enviamos um código para{" "}
                  <span className="font-medium">{email}</span>. Digite-o abaixo
                  para confirmar sua conta.
                </p>
              </div>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {msg && (
                <p
                  className={cn(
                    "text-sm text-center",
                    msgType === "error"
                      ? "text-input-text-error"
                      : "text-emerald-600"
                  )}
                >
                  {msg}
                </p>
              )}

              <div className="flex items-center justify-between gap-2">
                <Button
                  type="button"
                  className="rounded-full flex-1"
                  variant="outline"
                  onClick={handleResend}
                  disabled={isLoading}
                >
                  Reenviar código
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading || !canConfirm}
                >
                  {isLoading ? "Confirmando..." : "Confirmar"}
                </Button>
              </div>
            </form>
          )}

          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Ilustração"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Ao continuar, você concorda com nossos{" "}
        <a href="#">Termos e Política de Privacidade.</a>
      </div>
    </div>
  );
}
