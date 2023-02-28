import { createEffect } from "solid-js";
const ICON_SIZE = 64;
const OUTLINE_RADIUS = 28;
const POINTER_RADIUS = 22;

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.width = ICON_SIZE;
  canvas.height = ICON_SIZE;
  return canvas;
};

const createBackgroundCanvas = () => {
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d");

  // According to the docs `getContext` could return `null`
  if (!ctx) return canvas;

  ctx.beginPath();
  ctx.arc(ICON_SIZE * 0.5, ICON_SIZE * 0.5, OUTLINE_RADIUS, 0, 2 * Math.PI, false);
  ctx.closePath();

  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 6;
  ctx.fillStyle = "#fff";
  ctx.fill();

  return canvas;
};

export const useFaviconColor = (color: string): void => {
  let faviconNode: HTMLLinkElement | undefined = undefined;
  let canvas: HTMLCanvasElement | undefined = undefined;
  let backgroundCanvas: HTMLCanvasElement | undefined = undefined;

  // create canvases only once
  if (!canvas) {
    canvas = createCanvas();
    backgroundCanvas = createBackgroundCanvas(); // draw the background once
  }

  // generate a favicon only once on mobiles in order to improve performance
  const shouldReplace = () => {
    if (window.innerWidth < 768 && faviconNode) return false;
    return true;
  };

  // draw a new favicon and replace `link` tag
  const replaceFavicon = (pointerColor: string) => {
    if (!canvas || !backgroundCanvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // wipe out the canvas
    ctx.clearRect(0, 0, ICON_SIZE, ICON_SIZE);

    // draw the cached background
    ctx.drawImage(backgroundCanvas, 0, 0);

    // draw a pointer
    ctx.beginPath();
    ctx.arc(ICON_SIZE * 0.5, ICON_SIZE * 0.5, POINTER_RADIUS, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = pointerColor;
    ctx.fill();

    // create a new favicon tag
    const link = document.createElement("link");
    link.rel = "shortcut icon";
    link.href = canvas.toDataURL("image/x-icon");

    // remove the old favicon from the document
    if (faviconNode) document.head.removeChild(faviconNode);

    document.head.appendChild(link);
    faviconNode = link;
  };

  createEffect(() => {
    if (shouldReplace()) replaceFavicon(color);
  });
};
