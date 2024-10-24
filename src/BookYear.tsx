import {
  AbsoluteFill,
  useVideoConfig,
  staticFile,
  Audio,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { toFrames } from "./lib/frames";
import { Book } from "./OneBook";
import { BookList } from "./BookList";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./Intro";

type BookYearProps = {
  title: string;
  books: Book[];
  /** Don't call staticFile on this. */
  audioPath: string;
  maxVolume?: number;
};

export function BookYear({
  books,
  title,
  audioPath,
  maxVolume = 0.7,
}: BookYearProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationInFrames } = useVideoConfig();

  const transitionInFrames = toFrames(2, fps);
  const introDurationInFrames = toFrames(4, fps) + transitionInFrames;
  const bookListDurationInFrames =
    durationInFrames - introDurationInFrames + transitionInFrames;

  const volumeFadeOutInFrames = toFrames(5, fps);
  const volume = interpolate(
    frame,
    [0, durationInFrames - volumeFadeOutInFrames, durationInFrames],
    [maxVolume, maxVolume, 0],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        fontSize: "8px",
        fontFamily: "Poppins",
      }}
    >
      <Audio
        loop
        // eslint-disable-next-line @remotion/volume-callback
        volume={volume}
        src={staticFile(audioPath)}
      />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={introDurationInFrames}>
          <Intro title={title} books={books} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ durationInFrames: transitionInFrames })}
        />
        <TransitionSeries.Sequence durationInFrames={bookListDurationInFrames}>
          <BookList books={books} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}
