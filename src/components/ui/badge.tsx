import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-brand-blue/15 text-brand-blue border border-brand-blue/30",
        secondary:
          "bg-brand-orange/15 text-brand-orange border border-brand-orange/30",
        purple:
          "bg-brand-purple/15 text-brand-purple border border-brand-purple/30",
        green:
          "bg-brand-green/15 text-brand-green border border-brand-green/30",
        outline:
          "border border-slate-700 text-slate-300 bg-surface-navy/50",
        easy:
          "bg-brand-blue/15 text-brand-blue border border-brand-blue/30 font-bold",
        medium:
          "bg-brand-purple/15 text-brand-purple border border-brand-purple/30 font-bold",
        hard:
          "bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
