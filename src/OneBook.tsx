import { AbsoluteFill, Img, staticFile } from "remotion";

export type Book = {
  num: number;
  title: string;
  author: string;
  url: string;
};

export function OneBook({ title, author, url, num }: Book) {
  return (
    <div>
      <AbsoluteFill>
        <Img
          className="w-full h-full"
          style={{
            filter: "blur(200px)",
          }}
          src={staticFile(url)}
        />
      </AbsoluteFill>
      <div className="absolute inset-0 flex justify-center items-center">
        <Img className="w-full h-auto" src={staticFile(url)} />
      </div>
      <AbsoluteFill
        style={{
          fontFamily: "Poppins",
        }}
      >
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
