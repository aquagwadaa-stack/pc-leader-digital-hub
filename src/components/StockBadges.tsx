import type { StoreId } from "@/data/stores";
import { stores } from "@/data/stores";
import { Check, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  stock: Record<StoreId, number>;
  size?: "sm" | "md";
  className?: string;
}

function statusOf(qty: number) {
  if (qty <= 0) return { label: "Rupture", icon: X, color: "text-destructive bg-destructive/10" };
  if (qty <= 2)
    return {
      label: "Stock limité",
      icon: AlertCircle,
      color: "text-warning-foreground bg-warning/30",
    };
  return { label: "En stock", icon: Check, color: "text-success bg-success/10" };
}

export function StockBadges({ stock, size = "sm", className }: Props) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {stores.map((s) => {
        const qty = stock[s.id];
        const st = statusOf(qty);
        const Icon = st.icon;
        return (
          <span
            key={s.id}
            className={cn(
              "inline-flex items-center gap-1 rounded-md font-medium",
              st.color,
              size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs",
            )}
            title={`${s.shortName}: ${qty > 0 ? qty + " en stock" : "rupture"}`}
          >
            <Icon className="h-3 w-3" />
            {s.shortName}
          </span>
        );
      })}
    </div>
  );
}
