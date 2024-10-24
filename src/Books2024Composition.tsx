import * as Poppins from "@remotion/google-fonts/Poppins";
import { Book } from "./OneBook";
import { BookYear, bookYearSchema } from "./BookYear";
import { clampEven, toFrames } from "./lib/frames";
import { Composition } from "remotion";

Poppins.loadFont();

const books: Book[] = [
  {
    num: 1,
    imagePath: "2024/01-huasipungo.jpeg",
    title: "Huasipungo",
    author: "Jorge Icaza",
  },
  {
    num: 2,
    imagePath: "2024/02-orchard.jpeg",
    title: "The Orchard Keeper",
    author: "Cormac McCarthy",
  },
  {
    num: 3,
    imagePath: "2024/03-the-recognitions.jpeg",
    title: "The Recognitions",
    author: "William Gaddis",
  },
  {
    num: 4,
    imagePath: "2024/04-2666.jpeg",
    title: "2666",
    author: "Roberto Bolaño",
  },
  {
    num: 5,
    imagePath: "2024/05-moby-dick.jpeg",
    title: "Moby Dick",
    author: "Herman Melville",
  },
  {
    num: 6,
    imagePath: "2024/06-the-books.jpeg",
    title: "The Books of Jacob",
    author: "Olga Tokarczuk",
  },
  {
    num: 7,
    imagePath: "2024/07-the-brief.jpeg",
    title: "The Brief Wondrous Life of Oscar Wao",
    author: "Junot Díaz",
  },
  {
    num: 8,
    imagePath: "2024/08-winesburg.jpeg",
    title: "Winesburg, Ohio",
    author: "Sherwood Anderson",
  },
  {
    num: 9,
    imagePath: "2024/09-nightwood.jpeg",
    title: "Nightwood",
    author: "Djuna Barnes",
  },
  {
    num: 10,
    imagePath: "2024/10-ulysses.jpeg",
    title: "Ulysses",
    author: "James Joyce",
  },
  {
    num: 11,
    imagePath: "2024/11-gunslinger.jpeg",
    title: "Gunslinger",
    author: "Edward Dorn",
  },
  {
    num: 12,
    imagePath: "2024/12-on-heroes.jpeg",
    title: "On Heroes and Tombs",
    author: "Ernesto Sabato",
  },
  {
    num: 13,
    imagePath: "2024/13-street-of.jpeg",
    title: "The Street of Crocodiles",
    author: "Bruno Schulz",
  },
  {
    num: 14,
    imagePath: "2024/14-lonesome-dove.jpeg",
    title: "Lonesome Dove",
    author: "Larry McMurtry",
  },
  {
    num: 15,
    imagePath: "2024/15-fat-city.jpeg",
    title: "Fat City",
    author: "Leonard Gardner",
  },
  {
    num: 16,
    imagePath: "2024/16-angels.jpeg",
    title: "Angels",
    author: "Denis Johnson",
  },
  {
    num: 17,
    imagePath: "2024/17-obscene-bird.jpeg",
    title: "The Obscene Bird of Night",
    author: "José Donoso",
  },
];

const fps = 30;

const ratio = 1080 / 1440;
const height = 700;
const width = clampEven(height * ratio);

const introTransitionInFrames = toFrames(2, fps);
const introDurationInFrames = toFrames(4, fps) + introTransitionInFrames;

const durationInFrames =
  books.length * toFrames(3.2, fps) + introDurationInFrames;

export function Books2024Composition() {
  return (
    <Composition
      id="2024"
      component={BookYear}
      durationInFrames={durationInFrames}
      fps={fps}
      height={height}
      width={width}
      schema={bookYearSchema}
      defaultProps={{
        title: "2024 in Books",
        books,
        audioPath: "music/lofi-song-room-by-lofium-242714.mp3",
        introDurationInFrames,
        introTransitionInFrames,
      }}
    />
  );
}
