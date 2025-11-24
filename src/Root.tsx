import "./tailwind.css";
import { Books2024Composition } from "./Books2024Composition";
import { Books2025Composition } from "./Books2025Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Books2024Composition />
      <Books2025Composition />
    </>
  );
};
