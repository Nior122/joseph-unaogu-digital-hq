"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="button button-secondary no-print"><Printer size={18} aria-hidden="true" />Print / Save as PDF</button>;
}
