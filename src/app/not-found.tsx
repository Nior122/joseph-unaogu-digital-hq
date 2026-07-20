import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (<section className="container-px flex min-h-[70vh] flex-col items-center justify-center text-center"><span className="eyebrow mb-4">404</span><h1 className="font-display text-4xl font-semibold tracking-tighter2 text-paper sm:text-6xl">This node is still in the Lab.</h1><p className="mt-5 max-w-md text-paper-muted">The link you followed doesn't exist — but there's plenty more to explore.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/">Back home</Button><Button href="/projects" variant="secondary">Visit The Lab</Button></div></section>);
}