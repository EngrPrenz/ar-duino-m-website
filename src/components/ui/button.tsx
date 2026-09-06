import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-blue text-surface-void font-bold shadow-lg shadow-brand-blue/25 hover:bg-brand-blue/90 hover:shadow-brand-blue/40",
        secondary:
          "bg-brand-orange text-surface-void font-bold shadow-lg shadow-brand-orange/25 hover:bg-brand-orange/90 hover:shadow-brand-orange/40",
        purple:
          "bg-brand-purple text-white font-bold shadow-lg shadow-brand-purple/25 hover:bg-brand-purple/90 hover:shadow-brand-purple/40",
        outline:
          "border border-brand-blue/30 bg-surface-navy/60 text-slate-200 backdrop-blur-sm hover:border-brand-blue hover:bg-brand-blue/10 hover:text-white",
        outlineOrange:
          "border border-brand-orange/30 bg-surface-navy/60 text-slate-200 backdrop-blur-sm hover:border-brand-orange hover:bg-brand-orange/10 hover:text-white",
        ghost:
          "text-slate-300 hover:bg-surface-hover hover:text-white",
        link:
          "text-brand-blue underline-offset-4 hover:underline",
        glass:
          "bg-surface-card/80 backdrop-blur-md border border-white/10 text-white hover:bg-surface-hover hover:border-brand-blue/40 shadow-md",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base font-bold tracking-wide",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
