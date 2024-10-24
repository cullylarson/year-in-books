import "./tailwind.css";
import { Composition } from "remotion";
import { booksSchema, Books2024 } from "./Books2024";
import { clampEven, toFrames } from "./lib/frames";

const oneMinuteSeconds = 1 * 60;
const fps = 30;
const durationInFrames = toFrames(1.2 * oneMinuteSeconds, fps);

const ratio = 1080 / 1440;
const height = 700;
const width = clampEven(height * ratio);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="2024"
        component={Books2024}
        durationInFrames={durationInFrames}
        fps={fps}
        // height={1440}
        // width={1080}
        height={height}
        width={width}
        schema={booksSchema}
        defaultProps={{}}
      />
    </>
  );
};
