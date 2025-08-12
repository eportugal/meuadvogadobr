"use client";

import { useState, useEffect } from "react";
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

export default function SignUpFlowLawyerStatic() {
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [signupStep, setSignupStep] = useState<
    "basic" | "professional" | "availability" | "confirmation"
  >("basic");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [oabUF, setOabUF] = useState("");
  const [oabNumber, setOabNumber] = useState("");
  const [isOabValid, setIsOabValid] = useState<boolean | null>(null);
  const [isOabValidating, setIsOabValidating] = useState(false);
  const [oabValidationError, setOabValidationError] = useState("");
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

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

  /*useEffect(() => {
    const validate = async () => {
      setIsOabValid(null);
      setOabValidationError("");

      if (oabNumber.length < 3 || oabUF.length !== 2 || firstName.length < 2)
        return;

      setIsOabValidating(true);
      try {
        const res = await fetch("/api/validar-oab", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            number: oabNumber.trim(),
            uf: oabUF.trim().toUpperCase(),
            nome: firstName.trim(),
          }),
        });

        const result = await res.json();

        if (!result.success) {
          setIsOabValid(false);
          setOabValidationError("Erro interno no servidor");
          return;
        }

        if (!result.valid) {
          setIsOabValid(false);
          setOabValidationError("Verifique o número de inscrição");
          return;
        }

        if (!result.nomeCoincide) {
          setIsOabValid(false);
          setOabValidationError("Nome não confere com a OAB");
          return;
        }

        setIsOabValid(true);
        setOabValidationError("");
      } catch (err: any) {
        setIsOabValid(false);
        setOabValidationError("Erro inesperado na validação.");
      } finally {
        setIsOabValidating(false);
      }
    };

    validate();
  }, [oabNumber, oabUF, firstName]); */

  function handleBasicSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSignupStep("professional");
  }

  async function handleProfessionalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    /* if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

     if (!oabUF) {
      setOabValidationError("Selecione a UF da OAB.");
      setIsOabValid(false);
      return;
    }

    if (isOabValidating) {
      setOabValidationError("Aguarde a validação da OAB…");
      return;
    }
    if (isOabValid !== true) {
      setOabValidationError(
        oabValidationError ||
          "Não foi possível validar a OAB. Verifique os dados."
      );
      return;
    } */

    setSignupStep("availability");
  }

  function handleAvailabilitySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const hasAny = Object.values(availability).some((arr) => arr.length > 0);
    if (!hasAny) {
      alert("Selecione pelo menos um horário de atendimento.");
      return;
    }
    setSignupStep("confirmation");
  }

  function handleConfirmationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      alert("Digite o código com 6 dígitos numéricos.");
      return;
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
                        value={lastName}
                        placeholder="Ribeiro"
                        required
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
                          title="Informe exatamente 5 dígitos numéricos."
                          value={oabNumber}
                          onChange={(e) => {
                            const val = (
                              e.target as HTMLInputElement
                            ).value.replace(/\D/g, "");
                            setOabNumber(val);
                            // if (oabValidationError) setOabValidationError("");
                            //if (isOabValid === false) setIsOabValid(null);
                          }}
                          /*onInvalid={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity(
                              "Número da OAB inválido. Use exatamente 5 dígitos (somente números)."
                            );
                          }}*/
                          /* onInput={(e) => {
                            (e.target as HTMLInputElement).setCustomValidity(
                              ""
                            );
                          }}*/
                          // error={oabValidationError || undefined}
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

                    {isOabValidating && (
                      <p className="text-xs text-muted-foreground">
                        Validando OAB…
                      </p>
                    )}

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
                            onClick={() => {
                              setPracticeAreas((prev) =>
                                prev.includes(area)
                                  ? prev.filter((a) => a !== area)
                                  : [...prev, area]
                              );
                            }}
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

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isOabValidating}
                    >
                      {isOabValidating ? "Validando..." : "Próximo"}
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
                    <Button type="submit" className="w-full">
                      Criar Conta
                    </Button>
                  </form>
                )}

                {step === "signup" && signupStep === "confirmation" && (
                  <form className="space-y-6">
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground -mt-2 text-left">
                        Enviamos um código para{" "}
                        <span className="font-medium">{email}</span>. Digite-o
                        abaixo para confirmar sua conta.
                      </p>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Confirmar
                    </Button>
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
