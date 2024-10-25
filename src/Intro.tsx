import { Img, staticFile, useVideoConfig } from "remotion";
import { Book } from "./OneBook";

function fillArrayToLength<ArrayType>(
  arr: ArrayType[],
  targetLength: number,
): ArrayType[] {
  const result = [];

  while (result.length < targetLength) {
    result.push(...arr.slice(0, targetLength - result.length));
  }

  return result.slice(0, targetLength);
}

type BookTileProps = {
  book: Book;
  width: number;
  height: number;
};

function BookTile({ book, width, height }: BookTileProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Img src={staticFile(book.imagePath)} className="object-contain" />
    </div>
  );
}

type IntroProps = {
  title: string;
  books: Book[];
};

export function Intro({ title, books }: IntroProps) {
  const { width, height } = useVideoConfig();

  const numBooks = books.length;
  const numColumns = Math.max(5, Math.ceil(Math.sqrt(numBooks)));
  const numRows = numColumns;
  const tileWidth = width / numColumns;
  const tileHeight = height / numRows;

  const booksFilled = fillArrayToLength(books, numColumns * numRows);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
          gridTemplateRows: `repeat(${numRows}, 1fr)`,
        }}
      >
        {booksFilled.map((b, i) => (
          <BookTile key={i} book={b} width={tileWidth} height={tileHeight} />
        ))}
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-black blur-lg" />
        <h1
          className="relative shadow-md text-gray-50 bold"
          style={{
            fontSize: "6em",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
