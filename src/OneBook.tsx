import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const bookSchema = z.object({
  num: z.number(),
  title: z.string(),
  author: z.string(),
  /** Don't call staticFile on this. */
  imagePath: z.string(),
  dateFinished: z.date(),
  numPages: z.number(),
});

export type Book = z.infer<typeof bookSchema>;

export function OneBook({ title, author, imagePath, num }: Book) {
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
      <AbsoluteFill>
        <div
          className="flex absolute"
          style={{
            bottom: "2%",
            right: "2%",
          }}
        >
          <div
            className="bg-gray-900 text-gray-50 text-center"
            style={{
              padding: "2em",
              borderRadius: "0.6em",
            }}
          >
            <h1
              style={{
                fontSize: "3.1em",
              }}
            >
              {title}
            </h1>
            <h2
              className="text-right"
              style={{
                fontSize: "2.1em",
              }}
            >
              by {author}
            </h2>
            <h3
              className="absolute bg-gray-800"
              style={{
                borderRadius: "0.5em",
                padding: "0.3em 0.7em",
                top: "-0.8em",
                right: "-0.8em",
                fontSize: "1.4em",
              }}
            >
              #{num}
            </h3>
          </div>
        </div>
      </AbsoluteFill>
    </div>
  );
}
