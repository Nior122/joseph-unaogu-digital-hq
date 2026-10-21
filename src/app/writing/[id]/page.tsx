import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BookCover } from "@/components/writing/book-cover";
import { Button } from "@/components/ui/button";
import { writing, writingCoverSource } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return writing.map((book) => ({ id: book.id }));
}
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const book = writing.find((item) => item.id === id);
  if (!book) notFound();
  return pageMetadata(
    `${book.title.split(":")[0]} | Chenar`,
    book.description,
    `/writing/${book.id}`,
  );
}
export default async function WritingDetailPage({ params }: Props) {
  const { id } = await params;
  const book = writing.find((item) => item.id === id);
  if (!book) notFound();
  const paragraphs = (book.summary || book.description)
    .split("\n\n")
    .filter(Boolean);
  return (
    <article className="container page-content">
      <header className="case-heading">
        <Link href="/writing" className="text-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to all writing
        </Link>
        <h1>{book.title}</h1>
        {book.subtitle && <p>{book.subtitle}</p>}
        <p className="small-text">
          By {book.author} ·{" "}
          {book.genre === "fiction" ? "Fiction" : "Nonfiction"} · {book.status}
        </p>
      </header>
      <div className="book-detail">
        <BookCover
          title={book.title}
          src={book.coverImage}
          localSrc={writingCoverSource(book)}
          eager
        />
        <div className="stack">
          <section className="stack" aria-labelledby="book-summary">
            <h2 id="book-summary">Summary</h2>
            {paragraphs.map((paragraph, index) => (
              <p className="text-muted" key={index}>
                {paragraph}
              </p>
            ))}
          </section>
          {book.excerpt && (
            <section className="stack" aria-labelledby="book-excerpt">
              <h2 id="book-excerpt">Sample excerpt</h2>
              <p className="text-muted">{book.excerpt}</p>
            </section>
          )}
          <section className="stack" aria-labelledby="book-themes">
            <h2 id="book-themes">Key themes</h2>
            <ul className="bullet-list text-muted">
              {book.themes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </section>
          <section className="stack" aria-labelledby="book-status">
            <h2 id="book-status">Writing status</h2>
            <p className="text-muted">
              {book.status}.{" "}
              {book.status === "Published"
                ? "This piece is published."
                : "This piece is not marked as published."}
            </p>
            {book.link && (
              <Link className="text-link" href={book.link}>
                Read the published book
              </Link>
            )}
          </section>
          <div className="button-row">
            <Button href="/contact?service=eBook%20or%20writing#project-brief">
              Ask about a writing project
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Link href="/writing" className="text-link">
              See all writing
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
