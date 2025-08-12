"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown, Check, X } from "lucide-react";

export type MultiSelectHoursProps = {
  value: string[];
  onChange: (next: string[]) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  roundedFull?: boolean;
};

export function MultiSelectHours({
  value,
  onChange,
  options,
  placeholder = "Selecione horários",
  searchPlaceholder = "Buscar horário...",
  emptyText = "Nenhum horário encontrado.",
  disabled,
  className,
  roundedFull,
}: MultiSelectHoursProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (opt: string) => {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    );
  };

  const clearOne = (opt: string) => onChange(value.filter((v) => v !== opt));

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal bg-white text-gray-500 hover:text-gray-500",
              "h-9 rounded-md shadow-xs",
              roundedFull && "rounded-full"
            )}
          >
            {value.length ? `${value.length} selecionado(s)` : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command shouldFilter>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const checked = value.includes(opt);
                return (
                  <CommandItem
                    key={opt}
                    onSelect={() => toggle(opt)}
                    className="flex items-center gap-2 data-[selected=true]:bg-gray-100 transition-all"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(opt)}
                    />
                    <span className="flex-1 text-gray-800">{opt}</span>
                    {checked && <Check className="h-4 w-4 text-brand-700" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map((v) => (
              <Badge
                key={v}
                variant="default"
                className="gap-1 py-1 rounded-full"
              >
                {v}
                <button
                  type="button"
                  onClick={() => clearOne(v)}
                  className="ml-1 inline-flex"
                  aria-label={`Remover ${v}`}
                >
                  <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                </button>
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectHours;
