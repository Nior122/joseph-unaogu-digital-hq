export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute right-[-10%] top-20 h-[420px] w-[420px] rounded-full bg-signal-blue/10 blur-[130px]" />
      <div className="absolute bottom-[-15%] left-1/3 h-[360px] w-[360px] rounded-full bg-signal-green/8 blur-[120px]" />
    </div>
  );
}