import * as Poppins from "@remotion/google-fonts/Poppins";
import * as BerkshireSwash from "@remotion/google-fonts/BerkshireSwash";
import { Book } from "./OneBook";
import { BookYear, bookYearSchema } from "./BookYear";
import { clampEven, toFrames } from "./lib/frames";
import { Composition } from "remotion";

Poppins.loadFont();
BerkshireSwash.loadFont();

const books: Book[] = [
  {
    num: 1,
    imagePath: "2024/01-huasipungo.jpeg",
    title: "Huasipungo",
    author: "Jorge Icaza",
    dateFinished: new Date("2024-01-06"),
    numPages: 240,
  },
  {
    num: 2,
    imagePath: "2024/02-orchard.jpeg",
    title: "The Orchard Keeper",
    author: "Cormac McCarthy",
    dateFinished: new Date("2024-01-14"),
    numPages: 256,
  },
  {
    num: 3,
    imagePath: "2024/03-the-recognitions.jpeg",
    title: "The Recognitions",
    author: "William Gaddis",
    dateFinished: new Date("2024-03-03"),
    numPages: 976,
  },
  {
    num: 4,
    imagePath: "2024/04-2666.jpeg",
    title: "2666",
    author: "Roberto Bolaño",
    dateFinished: new Date("2024-04-03"),
    numPages: 1128,
  },
  {
    num: 5,
    imagePath: "2024/05-moby-dick.jpeg",
    title: "Moby Dick",
    author: "Herman Melville",
    dateFinished: new Date("2024-04-23"),
    numPages: 720,
  },
  {
    num: 6,
    imagePath: "2024/06-the-books.jpeg",
    title: "The Books of Jacob",
    author: "Olga Tokarczuk",
    dateFinished: new Date("2024-05-29"),
    numPages: 965,
  },
  {
    num: 7,
    imagePath: "2024/07-the-brief.jpeg",
    title: "The Brief Wondrous Life of Oscar Wao",
    author: "Junot Díaz",
    dateFinished: new Date("2024-06-02"),
    numPages: 335,
  },
  {
    num: 8,
    imagePath: "2024/08-winesburg.jpeg",
    title: "Winesburg, Ohio",
    author: "Sherwood Anderson",
    dateFinished: new Date("2024-06-08"),
    numPages: 240,
  },
  {
    num: 9,
    imagePath: "2024/09-nightwood.jpeg",
    title: "Nightwood",
    author: "Djuna Barnes",
    dateFinished: new Date("2024-06-15"),
    numPages: 182,
  },
  {
    num: 10,
    imagePath: "2024/10-ulysses.jpeg",
    title: "Ulysses",
    author: "James Joyce",
    dateFinished: new Date("2024-07-28"),
    numPages: 925,
  },
  {
    num: 11,
    imagePath: "2024/11-gunslinger.jpeg",
    title: "Gunslinger",
    author: "Edward Dorn",
    dateFinished: new Date("2024-08-02"),
    numPages: 224,
  },
  {
    num: 12,
    imagePath: "2024/12-on-heroes.jpeg",
    title: "On Heroes and Tombs",
    author: "Ernesto Sabato",
    dateFinished: new Date("2024-08-30"),
    numPages: 437,
  },
  {
    num: 13,
    imagePath: "2024/13-street-of.jpeg",
    title: "The Street of Crocodiles",
    author: "Bruno Schulz",
    dateFinished: new Date("2024-09-08"),
    numPages: 160,
  },
  {
    num: 14,
    imagePath: "2024/14-lonesome-dove.jpeg",
    title: "Lonesome Dove",
    author: "Larry McMurtry",
    dateFinished: new Date("2024-09-26"),
    numPages: 858,
  },
  {
    num: 15,
    imagePath: "2024/15-fat-city.jpeg",
    title: "Fat City",
    author: "Leonard Gardner",
    dateFinished: new Date("2024-09-30"),
    numPages: 183,
  },
  {
    num: 16,
    imagePath: "2024/16-angels.jpeg",
    title: "Angels",
    author: "Denis Johnson",
    dateFinished: new Date("2024-10-06"),
    numPages: 209,
  },
  {
    num: 17,
    imagePath: "2024/17-obscene-bird.jpeg",
    title: "The Obscene Bird of Night",
    author: "José Donoso",
    dateFinished: new Date("2024-10-22"),
    numPages: 466,
  },
  {
    num: 18,
    imagePath: "2024/18-the-wall.jpeg",
    title: "The Wall",
    author: "Marlen Haushofer",
    dateFinished: new Date("2024-11-18"),
    numPages: 238,
  },
  {
    num: 19,
    imagePath: "2024/19-infinite-jest.jpeg",
    title: "Infinite Jest",
    author: "David Foster Wallace",
    dateFinished: new Date("2024-11-30"),
    numPages: 1079,
  },
];

const fps = 30;

const ratio = 1080 / 1440;
const height = 700;
const width = clampEven(height * ratio);

const introTransitionInFrames = toFrames(2, fps);
const introDurationInFrames = toFrames(4, fps) + introTransitionInFrames;

const outroTransitionInFrames = toFrames(2, fps);
const outroDurationInFrames = toFrames(10, fps) + outroTransitionInFrames;

const durationInFrames = Math.ceil(
  books.length * toFrames(3.8, fps) +
    introDurationInFrames +
    outroDurationInFrames,
);

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
        books,
        audioPath: "music/lofi-song-room-by-lofium-242714.mp3",
        intro: {
          title: "2024 in Books",
          durationInFrames: introDurationInFrames,
          transitionInFrames: introTransitionInFrames,
        },
        outro: {
          title: "2024 in Books",
          durationInFrames: outroDurationInFrames,
          transitionInFrames: outroTransitionInFrames,
        },
      }}
    />
  );
}
