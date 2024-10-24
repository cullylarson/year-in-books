export function toFrames(seconds: number, fps: number): number {
  return Math.ceil(seconds * fps);
}

export function toSeconds(frames: number, fps: number): number {
  return frames / fps;
}

/** Returns an even value. Useful for computing dimensions for a video where the
 * values need to be even. */
export function clampEven(value: number): number {
  const options = [
    Math.floor(value),
    Math.ceil(value),
    Math.floor(value),
    Math.floor(value) + 1,
  ];

  for (const option of options) {
    if (option % 2 === 0) {
      return option;
    }
  }

  return value;
}
