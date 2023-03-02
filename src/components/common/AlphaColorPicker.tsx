import { createEffect, JSX, splitProps } from 'solid-js';

import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { createColorManipulation } from "../../hooks/useColorManipulation";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const AlphaColorPicker = <T extends AnyColor>(props: Props<T>): JSX.Element => {
  let nodeRef: undefined | HTMLDivElement = undefined;
  const [localprops, otherprops] = splitProps(props, ["colorModel", "color", "onChange", "class"]);

  createEffect(() => { if (nodeRef !== undefined) useStyleSheet(nodeRef) });

  const [{ hsva }, { handleChange }] = createColorManipulation(localprops.colorModel, localprops.color || localprops.colorModel.defaultColor, localprops.onChange);

  const nodeClass = formatClassName(["solid-colorful", localprops.class]);

  return (
    <div {...otherprops} ref={nodeRef} class={nodeClass}>
      <Saturation hsva={hsva()} onChange={handleChange} />
      <Hue hue={hsva().h} onChange={handleChange} />
      <Alpha hsva={hsva()} onChange={handleChange} class="solid-colorful__last-control" />
    </div>
  );
};
