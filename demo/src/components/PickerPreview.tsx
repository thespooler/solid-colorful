/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { HexColorInput } from "../../../src";
import { ColorPickerBaseProps, AnyColor } from "../../../src/types";
import { PreviewContainer, PreviewDemo, PreviewOutput, PreviewTitle } from "../styles";

interface Props<T extends AnyColor> {
  title: string;
  PickerComponent: (props: Partial<ColorPickerBaseProps<T>>) => JSX.Element;
  initialColor?: T;
}

export function PickerPreview<T extends AnyColor>(props: Props<T>): JSX.Element {
  const [color, setColor] = createSignal<T | undefined>(props.initialColor);

  return (
    <PreviewContainer>
      <PreviewTitle>{props.title}</PreviewTitle>
      <PreviewDemo>
        <props.PickerComponent color={color()} onChange={setColor} />
        {props.title.startsWith("HEX") && (
          // @ts-ignore
          <HexColorInput color={color()} onChange={setColor} prefixed alpha />
        )}
      </PreviewDemo>
      <PreviewOutput>{JSON.stringify(color())}</PreviewOutput>
    </PreviewContainer>
  );
}
