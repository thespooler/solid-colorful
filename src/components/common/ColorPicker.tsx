import { Hue } from "./Hue";
import { Saturation } from "./Saturation";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useColorManipulation } from "../../hooks/useColorManipulation";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";
import { JSX } from "solid-js";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const ColorPicker = <T extends AnyColor>(props: Props<T>): JSX.Element => {
  let nodeRef: HTMLDivElement | undefined;
  useStyleSheet(nodeRef);

  let {
    colorModel,
    color = colorModel.defaultColor,
    onChange,
    ...rest
  } = props;

  const [hsva, updateHsva] = useColorManipulation<T>(colorModel, color, onChange);

  const nodeClassName = formatClassName(["react-colorful", props.class]);

  return (
    <div {...rest} ref={nodeRef} class={nodeClassName}>
      <Saturation hsva={hsva} onChange={updateHsva} />
      <Hue hue={hsva.h} onChange={updateHsva} class="react-colorful__last-control" />
    </div>
  );
};
