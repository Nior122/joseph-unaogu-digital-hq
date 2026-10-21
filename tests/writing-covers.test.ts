import assert from "node:assert/strict";
import { test } from "node:test";
import { coverMatch } from "../scripts/recover-writing-covers.mjs";

const book = {
  id: "example",
  title: "An original book",
  coverImage: "https://example.com/original.jpg",
};
const image = {
  alt: book.title,
  src: book.coverImage,
  complete: true,
  naturalWidth: 768,
};

test("cover recovery only accepts a decoded image belonging to the original book", () => {
  assert.equal(coverMatch(book, image), null);
  assert.ok(coverMatch(book, { ...image, alt: "A different book" }));
  assert.ok(
    coverMatch(book, {
      ...image,
      src: "https://example.com/a-different-cover.jpg",
    }),
  );
  assert.ok(coverMatch(book, { ...image, naturalWidth: 0 }));
  assert.ok(coverMatch(book, { ...image, complete: false }));
  assert.ok(coverMatch(book, null));
});
