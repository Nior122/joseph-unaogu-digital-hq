"use client";

import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const prefix = useId();
  const [expanded, setExpanded] = useState<number[]>([]);
  return <div>{items.map((item, index) => {
    const open = expanded.includes(index);
    const Icon = open ? Minus : Plus;
    const questionId = `${prefix}-question-${index}`;
    const answerId = `${prefix}-answer-${index}`;
    return <div className="faq-item" key={item.q}>
      <h3><button type="button" id={questionId} className="faq-button" aria-expanded={open} aria-controls={answerId} onClick={() => setExpanded((current) => open ? current.filter((entry) => entry !== index) : [...current, index])}>{item.q}<Icon size={20} aria-hidden="true" /></button></h3>
      <div id={answerId} hidden={!open} className="faq-answer" aria-labelledby={questionId}><p>{item.a}</p></div>
    </div>;
  })}</div>;
}
