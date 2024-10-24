import { z } from "zod";
import { Fragment } from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  staticFile,
  Audio,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import * as Poppins from "@remotion/google-fonts/Poppins";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toFrames } from "./lib/frames";
import { Book, OneBook } from "./OneBook";

Poppins.loadFont();

export const booksSchema = z.object({});

const books: Book[] = [
  {
    num: 1,
    url: "1-huasipungo.jpeg",
    title: "Huasipungo",
    author: "Jorge Icaza",
  },
  {
    num: 2,
    url: "2-orchard.jpeg",
    title: "The Orchard Keeper",
    author: "Cormac McCarthy",
  },
  {
    num: 3,
    url: "3-the-recognitions.jpeg",
    title: "The Recognitions",
    author: "William Gaddis",
  },
  {
    num: 4,
    url: "4-2666.jpeg",
    title: "2666",
    author: "Roberto Bolaño",
  },
  {
    num: 5,
    url: "5-moby-dick.jpeg",
    title: "Moby Dick",
    author: "Herman Melville",
  },
  {
    num: 6,
    url: "6-the-books.jpeg",
    title: "The Books of Jacob",
    author: "Olga Tokarczuk",
  },
  {
    num: 7,
    url: "7-the-brief.jpeg",
    title: "The Brief Wondrous Life of Oscar Wao",
    author: "Junot Díaz",
  },
  {
    num: 8,
    url: "8-winesburg.jpeg",
    title: "Winesburg, Ohio",
    author: "Sherwood Anderson",
  },
  {
    num: 9,
    url: "9-nightwood.jpeg",
    title: "Nightwood",
    author: "Djuna Barnes",
  },
  {
    num: 10,
    url: "10-ulysses.jpeg",
    title: "Ulysses",
    author: "James Joyce",
  },
  {
    num: 11,
    url: "11-gunslinger.jpeg",
    title: "Gunslinger",
    author: "Edward Dorn",
  },
  {
    num: 12,
    url: "12-on-heroes.jpeg",
    title: "On Heroes and Tombs",
    author: "Ernesto Sabato",
  },
  {
    num: 13,
    url: "13-street-of.jpeg",
    title: "The Street of Crocodiles",
    author: "Bruno Schulz",
  },
  {
    num: 14,
    url: "14-lonesome-dove.jpeg",
    title: "Lonesome Dove",
    author: "Larry McMurtry",
  },
  {
    num: 15,
    url: "15-fat-city.jpeg",
    title: "Fat City",
    author: "Leonard Gardner",
  },
  {
    num: 16,
    url: "16-angels.jpeg",
    title: "Angels",
    author: "Denis Johnson",
  },
  {
    num: 17,
    url: "17-obscene-bird.jpeg",
    title: "The Obscene Bird of Night",
    author: "José Donoso",
  },
];

export const Books2024: React.FC<z.infer<typeof booksSchema>> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationInFrames } = useVideoConfig();

  const transitionInFrames = toFrames(1, fps);
  const numBooks = books.length;
  const durationPerBook = durationInFrames / numBooks + transitionInFrames;

  const volumeFadeOutInFrames = toFrames(5, fps);
  const volume = interpolate(
    frame,
    [0, durationInFrames - volumeFadeOutInFrames, durationInFrames],
    [1, 1, 0],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      className="bg-white"
      style={{
        fontSize: "8px",
      }}
    >
      <Audio
        loop
        // eslint-disable-next-line @remotion/volume-callback
        volume={volume}
        src={staticFile("lofi-song-room-by-lofium-242714.mp3")}
      />
      <TransitionSeries>
        {books.map((book, i) => (
          <Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={durationPerBook}>
              <OneBook {...book} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              // presentation={slide({ direction: "from-right" })}
              presentation={fade()}
              timing={springTiming({ durationInFrames: transitionInFrames })}
            />
          </Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
