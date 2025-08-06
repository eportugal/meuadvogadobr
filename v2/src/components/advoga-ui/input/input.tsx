"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon | React.ReactNode;
  onRightIconClick?: () => void;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      type,
      label,
      leftIcon: LeftIcon,
      rightIcon,
      onRightIconClick,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = id || reactId;
    const isRightIconComponent = React.isValidElement(rightIcon);
    const RightIcon = !isRightIconComponent ? (rightIcon as LucideIcon) : null;

    return (
      <div className="grid gap-2">
        {label && (
          <Label
            htmlFor={inputId}
            className="text-sm font-medium text-input-label"
          >
            {label}
          </Label>
        )}
        <div className="relative">
          {LeftIcon && (
            <LeftIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:bg-input-bg-disabled disabled:border-input-border-disabled disabled:text-muted-foreground",
              "border-input focus:border-input-border-focus focus:outline-none focus:ring-4 focus:ring-input-border-focus/20 shadow-xs",
              "max-w-full sm:max-w-xs",
              LeftIcon && "pl-10",
              (rightIcon || isRightIconComponent) && "pr-10",
              error &&
                "border-input-border-error focus:border-input-border-error focus:ring-input-border-error/20",
              className
            )}
            ref={ref}
            {...props}
          />
          {(RightIcon || isRightIconComponent) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {isRightIconComponent ? (
                rightIcon
              ) : onRightIconClick ? (
                <button
                  type="button"
                  onClick={onRightIconClick}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1 flex items-center justify-center"
                >
                  {RightIcon && <RightIcon className="size-4" />}
                </button>
              ) : (
                RightIcon && (
                  <RightIcon className="size-4 text-muted-foreground pointer-events-none" />
                )
              )}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-input-text-error mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
