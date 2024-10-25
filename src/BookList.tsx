import { Fragment } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toFrames } from "./lib/frames";
import { Book, OneBook } from "./OneBook";

type BookListProps = {
  books: Book[];
};

// TODO the last book scene is too short, and made shorter because of the
// transition overlap

export function BookList({ books }: BookListProps) {
  const { fps } = useVideoConfig();
  const { durationInFrames } = useVideoConfig();

  const transitionInFrames = toFrames(1.5, fps);
  const numBooks = books.length;
  const durationPerBook = Math.floor(
    durationInFrames / numBooks + transitionInFrames,
  );

  return (
    <AbsoluteFill className="bg-white">
      <TransitionSeries>
        {books.map((book, i) => (
          <Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={durationPerBook}>
              <OneBook {...book} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={springTiming({ durationInFrames: transitionInFrames })}
            />
          </Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
}
