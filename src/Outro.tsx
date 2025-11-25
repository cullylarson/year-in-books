import { format } from "date-fns";
import { Book } from "./OneBook";

function BookSummary({
  book,
  fontSizes,
}: {
  book: Book;
  fontSizes: { title: string; author: string; details: string };
}) {
  return (
    <div className="break-inside-avoid mb-3">
      <div>
        <span
          className="font-bold"
          style={{
            fontSize: fontSizes.title,
          }}
        >
          {book.title}
        </span>{" "}
      </div>
      <div className="text-gray-200" style={{ fontSize: fontSizes.author }}>
        by {book.author}
      </div>
      <div className="text-gray-400" style={{ fontSize: fontSizes.details }}>
        {format(book.dateFinished, "LLLL do")} /{" "}
        {new Intl.NumberFormat("en-US").format(book.numPages)} p.
      </div>
    </div>
  );
}

function pluralEnd(num: number, pluralEnding = "s") {
  return num === 1 ? "" : pluralEnding;
}

function getFontSizes(numBooks: number): {
  heading: string;
  bookTitle: string;
  bookAuthor: string;
  bookDetails: string;
  summary: string;
  columnsClassName: string;
} {
  if (numBooks <= 22) {
    return {
      heading: "9.55em",
      bookTitle: "3.1em",
      bookAuthor: "2.6em",
      bookDetails: "2.5em",
      summary: "2.5em",
      columnsClassName: "columns-2 gap-6",
    };
  } else if (numBooks <= 32) {
    return {
      heading: "8em",
      bookTitle: "2.5em",
      bookAuthor: "2.1em",
      bookDetails: "2em",
      summary: "2.3em",
      columnsClassName: "columns-3 gap-4",
    };
  } else {
    return {
      heading: "6.7em",
      bookTitle: "2.3em",
      bookAuthor: "1.9em",
      bookDetails: "1.8em",
      summary: "2.3em",
      columnsClassName: "columns-3 gap-4",
    };
  }
}

type OutroProps = {
  title: string;
  books: Book[];
};

export function Outro({ title, books }: OutroProps) {
  const numBooks = books.length;
  const numPages = books.reduce((acc, book) => acc + book.numPages, 0);
  const pagesPerDay = Math.round(numPages / 365);
  const daysPerBook = Math.round(365 / numBooks);
  const pagesPerBook = Math.round(numPages / numBooks);

  const fontSizes = getFontSizes(numBooks);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 flex flex-col gap-5">
        <h1
          className="text-center leading-none"
          style={{
            fontSize: fontSizes.heading,
            fontFamily: "Berkshire Swash",
          }}
        >
          {title}
        </h1>
        <div className={fontSizes.columnsClassName}>
          {books.map((book, i) => (
            <BookSummary
              key={i}
              book={book}
              fontSizes={{
                title: fontSizes.bookTitle,
                author: fontSizes.bookAuthor,
                details: fontSizes.bookDetails,
              }}
            />
          ))}
        </div>
        <div
          className="bg-gray-800 rounded-lg p-3"
          style={{ fontSize: fontSizes.summary }}
        >
          <div>
            <span className="font-bold">
              {new Intl.NumberFormat("en-US").format(numBooks)}
            </span>{" "}
            book{pluralEnd(numBooks)}.{" "}
            <span className="font-bold">
              {new Intl.NumberFormat("en-US").format(numPages)}
            </span>{" "}
            page{pluralEnd(numPages)}.{" "}
            <span className="font-bold">
              {new Intl.NumberFormat("en-US").format(pagesPerDay)}
            </span>{" "}
            page{pluralEnd(pagesPerDay)} per day.{" "}
            <span className="font-bold">
              {new Intl.NumberFormat("en-US").format(pagesPerBook)}
            </span>{" "}
            page{pluralEnd(pagesPerBook)} per book.{" "}
            <span className="font-bold">
              {new Intl.NumberFormat("en-US").format(daysPerBook)}
            </span>{" "}
            day{pluralEnd(daysPerBook)} per book.
          </div>
        </div>
      </div>
    </div>
  );
}
