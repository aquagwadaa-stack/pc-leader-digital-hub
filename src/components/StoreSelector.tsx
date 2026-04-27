import { stores, type StoreId } from "@/data/stores";

interface Props {
  value: StoreId | "all";
  onChange: (v: StoreId | "all") => void;
  includeAll?: boolean;
}

export function StoreSelector({ value, onChange, includeAll = true }: Props) {
  const options: { id: StoreId | "all"; label: string }[] = [
    ...(includeAll ? [{ id: "all" as const, label: "Tous les magasins" }] : []),
    ...stores.map((s) => ({ id: s.id, label: s.shortName })),
  ];
  return (
    <div className="flex flex-wrap gap-1.5 rounded-lg border bg-card p-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
            value === o.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
