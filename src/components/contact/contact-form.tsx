"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { site, contactProjectTypes } from "@/lib/content";
import { ButtonAction } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: contactProjectTypes[0], budget: "", message: "" });
  function update<K extends keyof typeof form>(key: K, value: string) { setForm((f) => ({ ...f, [key]: value })); }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New project: ${form.type} — ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  const input = "w-full rounded-xl border border-white/10 bg-ink-850/70 px-4 py-3 text-sm text-paper placeholder:text-paper-dim outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";
  return (
    <div className="surface p-7 sm:p-9">
      {sent ? (
        <div className="flex flex-col items-center py-10 text-center">
          <CheckCircle2 className="text-signal-green" size={42} />
          <h3 className="mt-4 font-display text-xl font-semibold text-paper">Your email app should be open</h3>
          <p className="mt-2 max-w-sm text-sm text-paper-muted">If nothing happened, email me directly at <a className="text-accent" href={`mailto:${site.email}`}>{site.email}</a>. I&apos;ll get back to you.</p>
          <button onClick={() => setSent(false)} className="mt-6 text-sm text-paper-muted underline-offset-4 hover:text-paper hover:underline">Send another</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-paper-dim">Name</label>
              <input required className={input} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-paper-dim">Email</label>
              <input required type="email" className={input} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-paper-dim">Project type</label>
              <select className={cn(input, "appearance-none")} value={form.type} onChange={(e) => update("type", e.target.value)}>
                {contactProjectTypes.map((t) => (<option key={t} value={t} className="bg-ink-850">{t}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-paper-dim">Budget range</label>
              <input className={input} value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="e.g. $200–$500" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-paper-dim">Message</label>
            <textarea required rows={5} className={cn(input, "resize-none")} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell me about your idea, timeline, or what you need help with." />
          </div>
          <ButtonAction type="submit" size="lg" className="w-full sm:w-auto"><Send size={16} /> Send message</ButtonAction>
        </form>
      )}
    </div>
  );
}