import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-button-primary-600/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-button-primary-600 text-white rounded-[30px] shadow-[0_1px_2px_1px_rgba(255,255,255,0.25)_inset] hover:bg-button-primary-700 focus-visible:bg-button-primary-600 disabled:bg-button-primary-200 disabled:shadow-[0_1px_2px_1px_rgba(255,255,255,0.25)_inset]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-gray-100 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-gray-400 dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "w-[159px] h-[36px] px-4 text-[14px] leading-[20px]",
        default: "w-[163px] h-[40px] px-4 text-[14px] leading-[20px]",
        md: "w-[163px] h-[40px] px-4 text-[14px] leading-[20px]",
        lg: "w-[178px] h-[44px] px-6 text-[16px] leading-[24px]",
        xl: "w-[182px] h-[48px] px-6 text-[16px] leading-[24px]",
        "2xl": "w-[226px] h-[60px] px-8 text-[18px] leading-[28px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
