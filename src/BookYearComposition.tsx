import { Composition } from "remotion";
import * as Poppins from "@remotion/google-fonts/Poppins";
import * as BerkshireSwash from "@remotion/google-fonts/BerkshireSwash";
import { Book } from "./OneBook";
import { BookYear, bookYearSchema } from "./BookYear";
import { calculateCompositionDurations } from "./lib/composition";

Poppins.loadFont();
BerkshireSwash.loadFont();

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
