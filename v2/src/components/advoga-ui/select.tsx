"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

export interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  leftIcon?: LucideIcon;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function SelectField({
  label,
  placeholder,
  value,
  onChange,
  options,
  leftIcon: LeftIcon,
  error,
  className,
  disabled,
}: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      {label && (
        <Label className="text-sm font-medium text-input-label">{label}</Label>
      )}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        )}
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            className={cn(
              "flex h-10 w-full min-h-[40px] max-w-full sm:max-w-xs items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm transition-all",
              "border-input-border-default focus:border-input-border-focus focus:outline-none focus:ring-4 focus:ring-input-border-focus/20",
              "placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:bg-input-bg-disabled disabled:border-input-border-disabled disabled:text-muted-foreground",
              LeftIcon && "pl-10",
              error &&
                "border-input-border-error focus:border-input-border-error focus:ring-input-border-error/20",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-white border border-input-border-default rounded-md shadow-md z-50">
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-xs text-input-text-error mt-1">{error}</p>}
    </div>
  );
}
