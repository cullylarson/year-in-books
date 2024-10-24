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
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toFrames } from "./lib/frames";
import { Book, OneBook } from "./OneBook";

type BookListProps = {
  books: Book[];
  /** Don't call staticFile on this. */
  audioPath: string;
};

export function BookList({ books, audioPath }: BookListProps) {
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
        src={staticFile(audioPath)}
      />
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
