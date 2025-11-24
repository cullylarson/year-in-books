import { Composition } from "remotion";
import * as Poppins from "@remotion/google-fonts/Poppins";
import * as BerkshireSwash from "@remotion/google-fonts/BerkshireSwash";
import { Book } from "./OneBook";
import { BookYear, bookYearSchema } from "./BookYear";
import { clampEven, toFrames } from "./lib/frames";

Poppins.loadFont();
BerkshireSwash.loadFont();

function calculateCompositionDurations({
  fps = 30,
  height,
  sizeRatio = 1080 / 1440,
  numStackImages,
  numBooks,
}: {
  fps?: number;
  sizeRatio?: number;
  height: number;
  numStackImages: number;
  numBooks: number;
}): {
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  introDurationInFrames: number;
  introTransitionInFrames: number;
  individualBookDurationInFrames: number;
  bookListDurationInFrames: number;
  stacksDurationInFrames: number;
  stacksTransitionInFrames: number;
  individualStackDurationInFrames: number;
  outroDurationInFrames: number;
  outroTransitionInFrames: number;
} {
  const haveStacks = numStackImages > 0;

  const width = clampEven(height * sizeRatio);

  const introTransitionInFrames = toFrames(0.75, fps);
  const introDurationInFrames = toFrames(4, fps) + introTransitionInFrames;

  const outroTransitionInFrames = toFrames(0.75, fps);
  const outroDurationInFrames = toFrames(10, fps);

  const stacksTransitionInFrames = haveStacks ? toFrames(0.75, fps) : 0;
  const individualStackDurationInFrames = toFrames(5.0, fps);
  const stacksDurationInFrames = haveStacks
    ? numStackImages * individualStackDurationInFrames + outroTransitionInFrames
    : 0;

  const individualBookDurationInFrames = toFrames(3.8, fps);
  const bookListDurationInFrames =
    numBooks * individualBookDurationInFrames +
    (haveStacks ? stacksTransitionInFrames : outroTransitionInFrames);

  const durationInFrames =
    introDurationInFrames +
    bookListDurationInFrames +
    stacksDurationInFrames +
    outroDurationInFrames -
    introTransitionInFrames -
    stacksTransitionInFrames -
    outroTransitionInFrames;

  return {
    fps,
    width,
    height,
    durationInFrames,
    introDurationInFrames,
    introTransitionInFrames,
    individualBookDurationInFrames,
    bookListDurationInFrames,
    stacksDurationInFrames,
    stacksTransitionInFrames,
    individualStackDurationInFrames,
    outroDurationInFrames,
    outroTransitionInFrames,
  };
}

export const BookYearComposition: React.FC<{
  id: string;
  books: Book[];
  audioPath: string;
  stackImagePaths?: string[];
}> = ({ id, books, audioPath, stackImagePaths = [] }) => {
  const haveStacks = stackImagePaths.length > 0;

  const {
    fps,
    width,
    height,
    durationInFrames,
    introDurationInFrames,
    introTransitionInFrames,
    individualBookDurationInFrames,
    bookListDurationInFrames,
    stacksDurationInFrames,
    stacksTransitionInFrames,
    individualStackDurationInFrames,
    outroDurationInFrames,
    outroTransitionInFrames,
  } = calculateCompositionDurations({
    fps: 30,
    height: 1440,
    numStackImages: stackImagePaths.length,
    numBooks: books.length,
  });

  return (
    <Composition
      id={id}
      component={BookYear}
      durationInFrames={durationInFrames}
      fps={fps}
      height={height}
      width={width}
      schema={bookYearSchema}
      defaultProps={{
        books,
        audioPath,
        scenes: {
          intro: {
            title: "2024 in Books",
            durationInFrames: introDurationInFrames,
            transitionInFrames: introTransitionInFrames,
          },
          bookList: {
            oneBookDurationInFrames: individualBookDurationInFrames,
            durationInFrames: bookListDurationInFrames,
          },
          stacks: haveStacks
            ? {
                imagePaths: stackImagePaths,
                durationInFrames: stacksDurationInFrames,
                transitionInFrames: stacksTransitionInFrames,
                oneImageDurationInFrames: individualStackDurationInFrames,
              }
            : undefined,
          outro: {
            title: "2024 in Books",
            durationInFrames: outroDurationInFrames,
            transitionInFrames: outroTransitionInFrames,
          },
        },
      }}
    />
  );
};
