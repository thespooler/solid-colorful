import { createEffect } from "solid-js";

export const useBodyBackground = (color: string): void => {
  createEffect(() => {
    document.body.style.backgroundColor = color;
  });
};
