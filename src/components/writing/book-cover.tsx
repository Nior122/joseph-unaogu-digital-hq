"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

/** Original cover URLs stay unchanged. Failed remote loads get an honest text fallback. */
export function BookCover({ title, src, eager = false }: { title: string; src?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <div className="book-cover">
    {src && !failed ? <img src={src} alt={`Cover of ${title}`} width={400} height={600} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} /> : <div className="preview-unavailable"><BookOpen size={30} strokeWidth={1.5} aria-hidden="true" /><strong>{title}</strong><span>Cover image unavailable.</span></div>}
  </div>;
}
