import { createEffect, JSX, splitProps } from "solid-js";

import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { ColorManipulationProvider } from "../../hooks/ColorManipulationContext";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const AlphaColorPicker = <T extends AnyColor>(props: Props<T>): JSX.Element => {
  // eslint-disable-next-line prefer-const
  let nodeRef: undefined | HTMLDivElement = undefined;
  const [localprops, otherprops] = splitProps(props, ["colorModel", "color", "onChange", "class"]);

  createEffect(() => {
    if (nodeRef !== undefined) useStyleSheet(nodeRef);
  });

  return (
    <div
      {...otherprops}
      ref={nodeRef}
      class={formatClassName(["solid-colorful", localprops.class])}
    >
      <ColorManipulationProvider<T>
        color={props.color || props.colorModel.defaultColor}
        colormodel={props.colorModel}
        onChange={props.onChange}
      >
        <Saturation />
        <Hue />
        <Alpha class="solid-colorful__last-control" />
      </ColorManipulationProvider>
    </div>
  );
};
