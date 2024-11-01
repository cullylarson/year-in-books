import { Fragment } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toFrames } from "./lib/frames";
import { Book, OneBook } from "./OneBook";

type BookListProps = {
  books: Book[];
  /** How long the transition is before the next scene. We need to add this to
   * the last book in order for it to display for the correct amount of time. */
  nextSceneTransitionInFrames: number;
  oneBookDurationInFrames: number;
};

export function BookList({
  books,
  oneBookDurationInFrames,
  nextSceneTransitionInFrames,
}: BookListProps) {
  const { fps } = useVideoConfig();

  const transitionInFrames = toFrames(0.5, fps);

  return (
    <AbsoluteFill className="bg-white">
      <TransitionSeries>
        {books.map((book, i) => {
          const isLastBook = i === books.length - 1;

          // need to add transition times because the scenes overlap during
          // transitions
          const bookDurationInFrames = isLastBook
            ? oneBookDurationInFrames + nextSceneTransitionInFrames
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
                timing={linearTiming({ durationInFrames: transitionInFrames })}
              />
            </Fragment>
          );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
}
