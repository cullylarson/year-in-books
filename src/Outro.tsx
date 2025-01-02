import { format } from "date-fns";
import { Book } from "./OneBook";

function BookSummary({ book }: { book: Book }) {
  return (
    <div className="break-inside-avoid mb-3">
      <div>
        <span
          className="font-bold"
          style={{
            fontSize: "3.1em",
          }}
        >
          {book.title}
        </span>{" "}
      </div>
      <div className="text-gray-200" style={{ fontSize: "2.6em" }}>
        by {book.author}
      </div>
      <div className="text-gray-400" style={{ fontSize: "2.5em" }}>
        {format(book.dateFinished, "LLLL do")} /{" "}
        {new Intl.NumberFormat("en-US").format(book.numPages)} p.
      </div>
    </div>
  );
}

function pluralEnd(num: number, pluralEnding = "s") {
  return num === 1 ? "" : pluralEnding;
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

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 flex flex-col gap-5">
        <h1
          className="text-center leading-none"
          style={{
            fontSize: "9.55em",
            fontFamily: "Berkshire Swash",
          }}
        >
          {title}
        </h1>
        <div className="columns-2 gap-6">
          {books.map((book, i) => (
            <BookSummary key={i} book={book} />
          ))}
        </div>
        <div
          className="bg-gray-800 rounded-lg p-3"
          style={{ fontSize: "2.5em" }}
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
