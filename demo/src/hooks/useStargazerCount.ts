import { Accessor, createEffect, createSignal } from "solid-js";

export const useStargazerCount = (): Accessor<number> => {
  const [count, setCount] = createSignal(1300);

  createEffect(() => {
    if (process.env.NODE_ENV !== "development" && "fetch" in window) {
      fetch("https://api.github.com/repos/omgovich/react-colorful").then((result) => {
        result.json().then((data) => setCount(data.stargazers_count));
      });
    }
  });

  return count;
};
