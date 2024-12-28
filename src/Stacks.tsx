import { Fragment } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { toFrames } from "./lib/frames";

type StacksProps = {
  imagePaths: string[];
  /** How long the transition is before the next scene. We need to add this to
   * the last book in order for it to display for the correct amount of time. */
  nextSceneTransitionInFrames: number;
  oneImageDurationInFrames: number;
};

export function Stacks({
  imagePaths,
  oneImageDurationInFrames,
  nextSceneTransitionInFrames,
}: StacksProps) {
  const { fps } = useVideoConfig();

  const transitionInFrames = toFrames(0.5, fps);

  return (
    <AbsoluteFill className="bg-white">
      <TransitionSeries>
        {imagePaths.map((imagePath, i) => {
          const isLastImage = i === imagePaths.length - 1;

          // need to add transition times because the scenes overlap during
          // transitions
          const imageDurationInFrames = isLastImage
            ? oneImageDurationInFrames + nextSceneTransitionInFrames
            : oneImageDurationInFrames + transitionInFrames;

          return (
            <Fragment key={i}>
              <TransitionSeries.Sequence
                durationInFrames={imageDurationInFrames}
              >
                <OneStack imagePath={imagePath} />
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

function OneStack({ imagePath }: { imagePath: string }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.05], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div>
      <AbsoluteFill>
        {/* This is a background that will show behind the book cover, if the book cover image doesn't take up the whole background. It's just a blurred version of the book cover image, so that it will be a color similar to the image itself. */}
        <Img
          className="w-full h-full"
          style={{
            filter: "blur(200px)",
          }}
          src={staticFile(imagePath)}
        />
      </AbsoluteFill>
      <div className="absolute inset-0 flex justify-center items-center">
        <Img
          className="w-full h-auto"
          src={staticFile(imagePath)}
          style={{
            transform: `scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
}
