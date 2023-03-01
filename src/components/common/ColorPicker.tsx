import { Hue } from "./Hue";
import { Saturation } from "./Saturation";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { JSX } from "solid-js";
import { createColorManipulation } from "../../hooks/useColorManipulation";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const ColorPicker = <T extends AnyColor>(props: Props<T>): JSX.Element => {
  let nodeRef: HTMLDivElement | undefined;
  if (nodeRef !== undefined) { useStyleSheet(nodeRef); }

  let {
    colorModel,
    color = colorModel.defaultColor,
    onChange,
    ...rest
  } = props;

  const [{ hsva }, { handleChange }] = createColorManipulation(colorModel, color, onChange);

  const nodeClassName = formatClassName(["react-colorful", props.class]);

  return (
    <div {...rest} ref={nodeRef} class={nodeClassName}>
      <Saturation hsva={hsva()} onChange={handleChange} />
      <Hue hue={hsva().h} onChange={handleChange} class="react-colorful__last-control" />
    </div>
  );
};
