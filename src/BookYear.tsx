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
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { Stacks } from "./Stacks";

export const bookYearSchema = z.object({
  books: bookSchema.array(),
  /** Don't call staticFile on this. */
  audioPath: z.string(),
  scenes: z.object({
    intro: z.object({
      title: z.string(),
      durationInFrames: z.number(),
      transitionInFrames: z.number(),
    }),
    bookList: z.object({
      durationInFrames: z.number(),
      oneBookDurationInFrames: z.number(),
    }),
    stacks: z
      .object({
        durationInFrames: z.number(),
        transitionInFrames: z.number(),
        oneImageDurationInFrames: z.number(),
        imagePaths: z.array(z.string()),
      })
      .optional(),
    outro: z.object({
      title: z.string(),
      durationInFrames: z.number(),
      transitionInFrames: z.number(),
    }),
  }),
  maxVolume: z.number().optional(),
});

export const BookYear: React.FC<z.infer<typeof bookYearSchema>> = ({
  books,
  audioPath,
  scenes,
  maxVolume = 0.4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { durationInFrames } = useVideoConfig();

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
        <TransitionSeries.Sequence
          durationInFrames={scenes.intro.durationInFrames}
        >
          <Intro title={scenes.intro.title} books={books} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: scenes.intro.transitionInFrames,
          })}
        />
        <TransitionSeries.Sequence
          durationInFrames={scenes.bookList.durationInFrames}
        >
          <BookList
            books={books}
            oneBookDurationInFrames={scenes.bookList.oneBookDurationInFrames}
            nextSceneTransitionInFrames={
              scenes.stacks
                ? scenes.stacks.durationInFrames
                : scenes.outro.transitionInFrames
            }
          />
        </TransitionSeries.Sequence>
        {scenes.stacks ? (
          <>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({
                durationInFrames: scenes.stacks.transitionInFrames,
              })}
            />
            <TransitionSeries.Sequence
              durationInFrames={scenes.stacks.durationInFrames}
            >
              <Stacks
                imagePaths={scenes.stacks.imagePaths}
                oneImageDurationInFrames={
                  scenes.stacks.oneImageDurationInFrames
                }
                nextSceneTransitionInFrames={scenes.stacks.durationInFrames}
              />
            </TransitionSeries.Sequence>
          </>
        ) : null}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: scenes.outro.transitionInFrames,
          })}
        />
        <TransitionSeries.Sequence
          durationInFrames={scenes.outro.durationInFrames}
        >
          <Outro title={scenes.outro.title} books={books} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
