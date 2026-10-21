import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { BookCover } from "@/components/writing/book-cover";
import { Button } from "@/components/ui/button";
import {
  writing,
  writingCoverSource,
  ebookProcess,
  coverStyles,
  services,
} from "@/lib/content";

export default function WritingPage() {
  const copywriting = services.find((service) => service.id === "copywriting")!;
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Books and writing that are clear and easy to read."
        description="I write eBooks and marketing copy. Below are pieces I've written and the process I follow."
      />
      <section
        className="container page-content"
        aria-labelledby="writing-samples"
      >
        <h2 id="writing-samples" className="mb-8">
          My eBooks and writing samples
        </h2>
        <p className="text-muted mb-8">
          Each piece shows its current writing status. These include works in
          progress and concepts, not claims of publication.
        </p>
        <div className="writing-grid">
          {writing.map((book) => (
            <article className="surface writing-card" key={book.id}>
              <BookCover
                src={book.coverImage}
                localSrc={writingCoverSource(book)}
                title={book.title}
              />
              <div className="book-labels">
                <span>
                  {book.genre === "fiction" ? "Fiction" : "Nonfiction"}
                </span>
                <span>· {book.status}</span>
              </div>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <Link className="text-link" href={`/writing/${book.id}`}>
                Read more<span className="sr-only"> about {book.title}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section section-rule section-soft"
        aria-labelledby="ebook-process"
      >
        <div className="container">
          <h2 id="ebook-process" className="mb-8">
            How an eBook project works
          </h2>
          <ol className="process-list reading">
            {ebookProcess.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span className="text-muted">{step.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        className="section section-rule"
        id="cover-design"
        aria-labelledby="cover-title"
      >
        <div className="container stack">
          <h2 id="cover-title">Cover design</h2>
          <p className="text-muted">
            Every eBook can include a cover. Styles I work in:
          </p>
          <ul className="tool-list">
            {coverStyles.map((style) => (
              <li key={style}>{style}</li>
            ))}
          </ul>
        </div>
      </section>
      <section
        className="section section-soft section-rule"
        id="copywriting"
        aria-labelledby="copywriting-title"
      >
        <div className="container stack">
          <h2 id="copywriting-title">{copywriting.title}</h2>
          <p className="text-muted">{copywriting.summary}</p>
          <Link className="text-link" href="/writing/copywriting-portfolio">
            View the copywriting portfolio
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className="container section"
        aria-labelledby="writing-contact-title"
      >
        <h2 id="writing-contact-title" className="mb-6">
          Have a writing project?
        </h2>
        <Button href="/contact?service=eBook%20or%20writing#project-brief">
          Start a writing project
          <ArrowRight size={17} aria-hidden="true" />
        </Button>
      </section>
    </>
  );
}
