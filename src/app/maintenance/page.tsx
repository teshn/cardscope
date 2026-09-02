import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance",
  description: "CardScope is temporarily unavailable while maintenance is in progress.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-12 md:px-6">
      <section className="w-full border-2 border-[var(--ink)] bg-[var(--paper)] p-6 shadow-[10px_10px_0_0_var(--ink)] md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          CardScope Status
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
          Scheduled Maintenance
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] md:text-base">
          We are currently updating infrastructure and card data integrity checks.
          Please come back in a few minutes.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="border border-[var(--ink)] bg-[var(--paper-strong)] p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Lookup</p>
            <p className="mt-1 text-sm font-semibold">Temporarily Paused</p>
          </div>
          <div className="border border-[var(--ink)] bg-[var(--paper-strong)] p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Card Media</p>
            <p className="mt-1 text-sm font-semibold">Temporarily Paused</p>
          </div>
          <div className="border border-[var(--ink)] bg-[var(--paper-strong)] p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Estimated Return</p>
            <p className="mt-1 text-sm font-semibold">Shortly</p>
          </div>
        </div>
      </section>
    </main>
  );
}
