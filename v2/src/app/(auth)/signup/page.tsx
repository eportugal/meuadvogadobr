"use client";

import { useState } from "react";
import { InputField } from "@/components/advoga-ui/input/input";
import { SelectField } from "@/components/advoga-ui/select";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Eye, EyeOff, CheckCircle, ArrowLeft, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignUpFlowLawyerStatic() {
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [signupStep, setSignupStep] = useState<"basic" | "professional">(
    "basic"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [oabUF, setOabUF] = useState("");
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

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
                      variant="link"
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
                ) : (
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Criar Conta</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Comece agora a transformar sua advocacia com a Advoga.ai
                    </p>
                  </div>
                )}

                {step === "signup" && signupStep === "basic" && (
                  <form className="space-y-4 w-full">
                    <div className="grid gap-2 w-full">
                      <Label htmlFor="nome">Nome</Label>
                      <InputField
                        id="nome"
                        type="nome"
                        placeholder="Pedro"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <InputField
                        id="sobrenome"
                        type="sobrenome"
                        placeholder="Ribeiro"
                        required
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
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Senha</Label>
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

                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => setSignupStep("professional")}
                    >
                      Próximo
                    </Button>
                  </form>
                )}

                {step === "signup" && signupStep === "professional" && (
                  <form className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="oabNumber">Número da OAB</Label>
                        <InputField id="oabNumber" placeholder="123456" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="oabUF">UF</Label>
                        <Select value={oabUF} onValueChange={setOabUF}>
                          <SelectTrigger id="oabUF" className="w-full">
                            <SelectValue placeholder="Selecione" />
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
                                : "outline"
                            }
                            onClick={() => {
                              setPracticeAreas((prev) =>
                                prev.includes(area)
                                  ? prev.filter((a) => a !== area)
                                  : [...prev, area]
                              );
                            }}
                            className="cursor-pointer rounded-full px-2 py-1 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                          >
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Criar Conta
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
