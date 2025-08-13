"use client";

import { useState } from "react";
import { InputField } from "@/components/advoga-ui/input/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/advoga-ui/button/button";
import { Label } from "@/components/ui/label";
import { Mail, Eye, EyeOff, ArrowLeft, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/advoga-ui/select";
import { Badge } from "@/components/advoga-ui/badge/badge";
import { MultiSelectHours } from "@/components/advoga-ui/multi-selector-hours";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/advoga-ui/input-otp";
import { useAuth } from "@/contexts/AuthProvider";

export default function SignUpFlowLawyer() {
  const {
    registerUser,
    confirmUserRegistration,
    resendConfirmationCode,
    isLoading,
  } = useAuth();

  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [signupStep, setSignupStep] = useState<
    "basic" | "professional" | "availability" | "confirmation"
  >("basic");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // 🔐 necessário pro Cognito
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [oabUF, setOabUF] = useState("");
  const [oabNumber, setOabNumber] = useState("");

  const [availability, setAvailability] = useState<Record<string, string[]>>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  const [lawyerId, setLawyerId] = useState<string | null>(null); // << id do Dynamo
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"success" | "error" | null>(null);

  const dayLabels: Record<string, string> = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
  };
  const hourOptions = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const allPracticeAreas = [
    "Direito Civil",
    "Direito Penal",
    "Direito Trabalhista",
    "Direito Tributário",
    "Direito de Família",
    "Direito do Consumidor",
    "Direito Previdenciário",
    "Direito Ambiental",
    "Direito Empresarial",
  ];
  const ufOptions = [
    "SP",
    "RJ",
    "MG",
    "RS",
    "BA",
    "PR",
    "SC",
    "DF",
    "GO",
    "PE",
    "CE",
    "PA",
    "AM",
    "ES",
    "MA",
    "PB",
    "RN",
    "MT",
    "MS",
    "SE",
  ];

  function handleBasicSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setMsg("Preencha nome, sobrenome, email e senha.");
      setMsgType("error");
      return;
    }
    setMsg(null);
    setMsgType(null);
    setSignupStep("professional");
  }

  async function handleProfessionalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!oabUF) {
      setMsg("Selecione a UF.");
      setMsgType("error");
      return;
    }
    if (!oabNumber) {
      setMsg("Informe o número da OAB.");
      setMsgType("error");
      return;
    }
    if (practiceAreas.length === 0) {
      setMsg("Selecione pelo menos uma área.");
      setMsgType("error");
      return;
    }
    setMsg(null);
    setMsgType(null);
    setSignupStep("availability");
  }

  async function handleAvailabilitySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setMsgType(null);

    const hasAnyHour = Object.values(availability).some(
      (arr) => arr.length > 0
    );
    if (!hasAnyHour) {
      setMsg("Selecione pelo menos um horário de atendimento.");
      setMsgType("error");
      return;
    }

    const reg = await registerUser({
      username: email,
      password,
      profileType: "advogado",
      firstname: firstName,
      lastname: lastName,
    });
    if (!reg.success) {
      setMsg(reg.message || "Não foi possível criar a conta.");
      setMsgType("error");
      return;
    }

    try {
      const cleanOAB = `${oabNumber.trim()}/${oabUF.trim().toUpperCase()}`;

      const r = await fetch("/api/create-lawyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.toLowerCase().trim(),
          oab: cleanOAB,
          practiceAreas,
        }),
      });

      const j = await r.json();
      if (!r.ok || !j.success) {
        if (r.status !== 409) {
          setMsg(j.error || "Não foi possível criar o registro do advogado.");
          setMsgType("error");
          return;
        }
      } else {
        setLawyerId(j.id as string);
      }
    } catch (err) {
      setMsg("Erro ao salvar o advogado no banco.");
      setMsgType("error");
      return;
    }

    setSignupStep("confirmation");
    setMsg(`Enviamos um código para ${email}.`);
    setMsgType("success");

    setSignupStep("confirmation");
  }

  async function handleConfirmationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setMsgType(null);

    if (!/^\d{6}$/.test(otp)) {
      setMsg("Digite o código com 6 dígitos numéricos.");
      setMsgType("error");
      return;
    }

    const conf = await confirmUserRegistration(email, otp);

    if (!conf.success) {
      setMsg(conf.message || "Não foi possível confirmar o código.");
      setMsgType("error");
      return;
    }

    if (lawyerId) {
      try {
        const r = await fetch("/api/set-availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lawyerId,
            weeklySchedule: availability,
          }),
        });
        const j = await r.json();
        if (!r.ok || !j.success) {
          setMsg(
            j.error || "Conta confirmada, mas falhou ao salvar disponibilidade."
          );
          setMsgType("error");
          return;
        }
      } catch {
        setMsg("Conta confirmada, mas houve erro ao salvar disponibilidade.");
        setMsgType("error");
        return;
      }
    } else {
      setMsg("Conta confirmada! Complete sua disponibilidade no perfil.");
      setMsgType("success");
      return;
    }

    setMsg("Conta confirmada e disponibilidade salva com sucesso!");
    setMsgType("success");
    // TODO: redirecionar para dashboard
  }

  async function handleResend() {
    setMsg(null);
    setMsgType(null);
    const res = await resendConfirmationCode(email);
    if (res.success) {
      setMsgType("success");
    } else {
      setMsg(res.message || "Não foi possível reenviar o código.");
      setMsgType("error");
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/placeholder.svg"
                  alt="Ilustração"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center">
                {step === "signup" && signupStep === "professional" ? (
                  <div className="mb-6">
                    <Button
                      onClick={() => setSignupStep("basic")}
                      variant="ghost"
                      className="pl-0 text-primary w-fit"
                    >
                      <ArrowLeft className="h-4 w-4" /> Voltar
                    </Button>
                    <h2 className="text-xl font-bold mt-4">
                      Informações Profissionais
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Complete seus dados profissionais para concluir o cadastro
                    </p>
                  </div>
                ) : signupStep === "availability" ? (
                  <div className="mb-6">
                    <Button
                      onClick={() => setSignupStep("professional")}
                      variant="ghost"
                      className="pl-0 text-primary w-fit"
                    >
                      <ArrowLeft className="h-4 w-4" /> Voltar
                    </Button>
                    <h2 className="text-xl font-bold mt-4">
                      Horários de Atendimento
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Selecione os horários disponíveis para cada dia da semana.
                    </p>
                  </div>
                ) : signupStep === "confirmation" ? (
                  <div className="mb-6">
                    <Button
                      onClick={() => setSignupStep("availability")}
                      variant="ghost"
                      className="pl-0 text-primary w-fit"
                    >
                      <ArrowLeft className="h-4 w-4" /> Voltar
                    </Button>
                    <h2 className="text-xl font-bold mt-4">
                      Confirme seu Cadastro
                    </h2>
                  </div>
                ) : (
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Criar Conta</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Comece agora a transformar sua advocacia com a Advoga.ai
                    </p>
                  </div>
                )}

                {step === "signup" && signupStep === "basic" && (
                  <form
                    className="space-y-4 w-full"
                    onSubmit={handleBasicSubmit}
                  >
                    <div className="grid gap-2 w-full">
                      <Label htmlFor="nome">Nome</Label>
                      <InputField
                        id="nome"
                        type="text"
                        placeholder="Pedro"
                        required
                        className="w-full"
                        value={firstName}
                        onChange={(e) =>
                          setFirstName((e.target as HTMLInputElement).value)
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <InputField
                        id="sobrenome"
                        type="text"
                        placeholder="Ribeiro"
                        required
                        value={lastName}
                        onChange={(e) =>
                          setlastName((e.target as HTMLInputElement).value)
                        }
                      />
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

                    {msg && signupStep === "basic" && (
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

                    <Button type="submit" className="w-full">
                      Próximo
                    </Button>
                  </form>
                )}

                {step === "signup" && signupStep === "professional" && (
                  <form
                    className="space-y-4"
                    onSubmit={handleProfessionalSubmit}
                  >
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="oabNumber">Número da OAB</Label>
                        <InputField
                          id="oabNumber"
                          name="oabNumber"
                          placeholder="12345"
                          required
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          value={oabNumber}
                          onChange={(e) =>
                            setOabNumber(
                              (e.target as HTMLInputElement).value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="oabUF">UF</Label>
                        <Select value={oabUF} onValueChange={setOabUF}>
                          <SelectTrigger id="oabUF" className="w-full">
                            <SelectValue placeholder="DF" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ufOptions.map((uf) => (
                                <SelectItem key={uf} value={uf}>
                                  {uf}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="areas">Áreas de Atuação</Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {allPracticeAreas.map((area) => (
                          <Badge
                            key={area}
                            variant={
                              practiceAreas.includes(area)
                                ? "default"
                                : "secondary"
                            }
                            onClick={() =>
                              setPracticeAreas((prev) =>
                                prev.includes(area)
                                  ? prev.filter((a) => a !== area)
                                  : [...prev, area]
                              )
                            }
                            className="cursor-pointer rounded-full px-2 py-1 transition-colors"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                      <input
                        aria-hidden
                        tabIndex={-1}
                        className="sr-only"
                        value={oabUF}
                        onChange={() => {}}
                        required
                      />
                    </div>

                    {msg && signupStep === "professional" && (
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
                      disabled={isLoading}
                    >
                      Próximo
                    </Button>
                  </form>
                )}

                {step === "signup" && signupStep === "availability" && (
                  <form
                    className="space-y-6"
                    onSubmit={handleAvailabilitySubmit}
                  >
                    <div className="flex flex-col gap-4">
                      {Object.keys(availability).map((dayKey) => (
                        <div key={dayKey} className="flex flex-col gap-2">
                          <Label className="mb-1">
                            {dayLabels[dayKey] || dayKey}
                          </Label>
                          <MultiSelectHours
                            value={availability[dayKey]}
                            options={hourOptions}
                            onChange={(next) =>
                              setAvailability((prev) => ({
                                ...prev,
                                [dayKey]: next,
                              }))
                            }
                            placeholder="Selecione horários"
                          />
                        </div>
                      ))}
                    </div>

                    {msg && signupStep === "availability" && (
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
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando..." : "Criar Conta"}
                    </Button>
                  </form>
                )}

                {step === "signup" && signupStep === "confirmation" && (
                  <form
                    className="space-y-6"
                    onSubmit={handleConfirmationSubmit}
                  >
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground -mt-2 text-left">
                        Enviamos um código para{" "}
                        <span className="font-medium">{email}</span>. Digite-o
                        abaixo para confirmar sua conta.
                      </p>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                          autoFocus
                        >
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
                        disabled={isLoading || !/^\d{6}$/.test(otp)}
                      >
                        {isLoading ? "Confirmando..." : "Confirmar"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Ao continuar, você concorda com nossos{" "}
            <a href="#">Termos e Política de Privacidade.</a>
          </div>
        </div>
      </div>
    </div>
  );
}
