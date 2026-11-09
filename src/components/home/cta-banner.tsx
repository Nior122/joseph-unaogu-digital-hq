import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function CtaBanner() {
  return (
    <section className="relative pb-20 pt-2 sm:pb-24">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 px-6 py-9 shadow-[0_40px_100px_-40px_rgba(124,77,255,0.85)] sm:px-10 sm:py-10">
            {/* light streak */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
              <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brand-300/25 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
            </div>

            <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div className="flex items-center gap-4">
                <span className="hidden h-12 w-12 flex-none place-items-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25 sm:grid">
                  <Send size={20} className="text-white" />
                </span>
                <div>
                  <h2 className="font-display text-[26px] font-extrabold tracking-tight text-white sm:text-[30px]">
                    Ready to Work Together?
                  </h2>
                  <p className="mt-1.5 text-[14px] text-white/80">
                    Let&apos;s turn your ideas into powerful digital solutions today.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Contact Me
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
