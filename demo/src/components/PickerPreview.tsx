/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { HexColorInput } from "../../../src";
import { ColorPickerBaseProps, AnyColor } from "../../../src/types";
import { PreviewContainer, PreviewDemo, PreviewOutput, PreviewTitle } from "../styles";

interface Props<T extends AnyColor> {
  title: string;
  frame?: boolean;
  PickerComponent: (props: Partial<ColorPickerBaseProps<T>>) => JSX.Element;
  initialColor?: T;
}

export function PickerPreview<T extends AnyColor>({
  title,
  frame,
  PickerComponent,
  initialColor,
}: Props<T>): JSX.Element {
  const [color, setColor] = createSignal<T | undefined>(initialColor);

  const handleChange = (color: T) => {
    console.log("🎨", color);
    setColor((prev) => color);
  };
  return (
    <PreviewContainer>
      <PreviewTitle>{title}</PreviewTitle>
      <PreviewDemo>
        <PickerComponent color={color()} onChange={handleChange} />
        {title.startsWith("HEX") && (
          // @ts-ignore
          <HexColorInput color={color()} onChange={handleChange} prefixed alpha />
        )}
      </PreviewDemo>
      <PreviewOutput>{JSON.stringify(color())}</PreviewOutput>
    </PreviewContainer>
  );
}
