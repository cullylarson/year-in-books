import {
  AbsoluteFill,
  useVideoConfig,
  staticFile,
  Audio,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { z } from "zod";
import { toFrames } from "./lib/frames";
import { bookSchema } from "./OneBook";
import { BookList } from "./BookList";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./Intro";

export const bookYearSchema = z.object({
  title: z.string(),
  books: bookSchema.array(),
  /** Don't call staticFile on this. */
  audioPath: z.string(),
  introDurationInFrames: z.number(),
  introTransitionInFrames: z.number(),
  maxVolume: z.number().optional(),
});

export const BookYear: React.FC<z.infer<typeof bookYearSchema>> = ({
  books,
  title,
  audioPath,
  introDurationInFrames,
  introTransitionInFrames,
  maxVolume = 0.4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationInFrames } = useVideoConfig();

  const bookListDurationInFrames =
    durationInFrames - introDurationInFrames + introTransitionInFrames;

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
          timing={springTiming({ durationInFrames: introTransitionInFrames })}
        />
        <TransitionSeries.Sequence durationInFrames={bookListDurationInFrames}>
          <BookList books={books} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
