import { Hue } from "./Hue";
import { Saturation } from "./Saturation";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { createEffect, JSX, splitProps } from "solid-js";
import { createColorManipulation } from "../../hooks/useColorManipulation";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const ColorPicker = <T extends AnyColor>(props: Props<T>): JSX.Element => {
  let nodeRef: HTMLDivElement | undefined;
  const [localprops, otherprops] = splitProps(props, ["colorModel", "color", "onChange", "class"]);

  createEffect(() => {
    if (nodeRef !== undefined) useStyleSheet(nodeRef);
  });

  const [{ hsva }, { handleChange }] = createColorManipulation(
    localprops.colorModel,
    localprops.color || localprops.colorModel.defaultColor,
    localprops.onChange
  );

  const nodeClassName = formatClassName(["solid-colorful", localprops.class]);

  createEffect(() => {
    if (props.color !== undefined) {
      const hsva = props.colorModel.toHsva(props.color);
      handleChange(hsva);
    }
  });

  return (
    <div {...otherprops} ref={nodeRef} class={nodeClassName}>
      <Saturation hsva={hsva()} onChange={handleChange} />
      <Hue hue={hsva().h} onChange={handleChange} class="solid-colorful__last-control" />
    </div>
  );
};
