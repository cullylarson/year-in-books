import { Fragment } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toFrames } from "./lib/frames";
import { Book, OneBook } from "./OneBook";

type BookListProps = {
  books: Book[];
  lastBookTransitionInFrames: number;
  oneBookDurationInFrames: number;
};

// TODO You can see the intro "Year in Books" at the end of the transition,
// while you see the first video. Maybe use linearTiming

export function BookList({
  books,
  oneBookDurationInFrames,
  lastBookTransitionInFrames,
}: BookListProps) {
  const { fps } = useVideoConfig();

  const transitionInFrames = toFrames(1.5, fps);

  return (
    <AbsoluteFill className="bg-white">
      <TransitionSeries>
        {books.map((book, i) => {
          const isLastBook = i === books.length - 1;

          const bookDurationInFrames = isLastBook
            ? oneBookDurationInFrames + lastBookTransitionInFrames
            : oneBookDurationInFrames + transitionInFrames;

          return (
            <Fragment key={i}>
              <TransitionSeries.Sequence
                durationInFrames={bookDurationInFrames}
              >
                <OneBook {...book} />
              </TransitionSeries.Sequence>
              <TransitionSeries.Transition
                presentation={fade()}
                timing={springTiming({ durationInFrames: transitionInFrames })}
              />
            </Fragment>
          );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
}
