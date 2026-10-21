"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

type CoverProps = {
  title: string;
  src?: string;
  localSrc?: string;
  eager?: boolean;
};

function CoverImage({
  title,
  sources,
  eager,
}: {
  title: string;
  sources: string[];
  eager: boolean;
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex];
  return source ? (
    <img
      src={source}
      alt={`Cover of ${title}`}
      width={400}
      height={600}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setSourceIndex((current) => current + 1)}
    />
  ) : (
    <div className="preview-unavailable">
      <BookOpen size={30} strokeWidth={1.5} aria-hidden="true" />
      <strong>{title}</strong>
      <span>Cover image unavailable.</span>
    </div>
  );
}

/** Cached covers are byte-for-byte copies; original URLs remain the fallback and stay unchanged in content. */
export function BookCover({ title, src, localSrc, eager = false }: CoverProps) {
  const sources = Array.from(
    new Set([localSrc, src].filter((value): value is string => !!value)),
  );
  return (
    <div className="book-cover">
      <CoverImage
        key={sources.join("|")}
        title={title}
        sources={sources}
        eager={eager}
      />
    </div>
  );
}
