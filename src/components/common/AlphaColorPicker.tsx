import { createEffect, JSX } from 'solid-js';

import { Hue } from "./Hue";
import { Saturation } from "./Saturation";
import { Alpha } from "./Alpha";

import { ColorModel, ColorPickerBaseProps, AnyColor } from "../../types";
import { useColorManipulation } from "../../hooks/useColorManipulation";
import { useStyleSheet } from "../../hooks/useStyleSheet";
import { formatClassName } from "../../utils/format";

interface Props<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>;
}

export const AlphaColorPicker = <T extends AnyColor>({
  class: className,
  colorModel,
  color = colorModel.defaultColor,
  onChange,
  ...rest
}: Props<T>): JSX.Element => {
  let nodeRef: undefined | HTMLDivElement = undefined;

  createEffect(() => { if (nodeRef !== undefined) useStyleSheet(nodeRef) });

  const [hsva, updateHsva] = useColorManipulation<T>(colorModel, color, onChange);

  const nodeClass = formatClassName(["react-colorful", className]);

  return (
    <div {...rest} ref={nodeRef} class={nodeClass}>
      <Saturation hsva={hsva()} onChange={updateHsva} />
      <Hue hue={hsva().h} onChange={updateHsva} />
      <Alpha hsva={hsva()} onChange={updateHsva} className="react-colorful__last-control" />
    </div>
  );
};
