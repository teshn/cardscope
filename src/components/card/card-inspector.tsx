import type { CardPrintingSummary } from "@/types/card";

type CardInspectorProps = {
  card: CardPrintingSummary;
};

export function CardInspector({ card }: CardInspectorProps) {
  return (
    <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4">
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Card Facts</p>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
        <FactRow label="Dimensions" value={`${card.facts.widthMm} x ${card.facts.heightMm} mm`} />
        <FactRow label="Weight" value={`${card.facts.weightGrams} g`} />
        <FactRow label="Printing Date" value={card.facts.printedAt} />
        <FactRow label="Version" value={card.facts.variant} />
        <FactRow label="Illustrator" value={card.illustrator} />
        <FactRow label="Language" value={card.facts.language} />
        <FactRow label="Set" value={`${card.setName} (${card.setCode})`} />
        <FactRow label="Card Number" value={card.cardNumber} />
      </dl>
    </section>
  );
}

type FactRowProps = {
  label: string;
  value: string;
};

function FactRow({ label, value }: FactRowProps) {
  return (
    <div className="border border-[var(--ink)] p-3">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{label}</dt>
      <dd className="mt-1 text-base font-semibold">{value}</dd>
    </div>
  );
}
