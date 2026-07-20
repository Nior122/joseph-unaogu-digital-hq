"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-paper transition hover:border-accent/50 hover:bg-white/5">
      <Printer size={16} /> Print / Save as PDF
    </button>
  );
}