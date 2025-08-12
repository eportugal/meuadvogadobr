"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // tamanho/alinhamento
        "relative flex h-9 w-9 items-center justify-center text-sm outline-none transition-all shadow-xs",
        // borda base igual ao InputField
        "border border-input bg-transparent first:rounded-l-md last:rounded-r-md",
        // estado ATIVO (equivalente ao foco do input)
        "data-[active=true]:z-10 data-[active=true]:border-input-border-focus data-[active=true]:ring-4 data-[active=true]:ring-input-border-focus/20",
        // erro (base e ativo)
        "aria-invalid:border-input-border-error data-[active=true]:aria-invalid:border-input-border-error data-[active=true]:aria-invalid:ring-input-border-error/20",
        // desabilitado
        "disabled:cursor-not-allowed disabled:bg-input-bg-disabled disabled:border-input-border-disabled disabled:text-muted-foreground",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
