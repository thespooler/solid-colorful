import { JSX } from "solid-js";
import { ColorPicker } from "./common/ColorPicker";
import { ColorModel, ColorPickerBaseProps } from "../types";
import { equalHex } from "../utils/compare";
import { hexToHsva, hsvaToHex } from "../utils/convert";

const hexColorModel: ColorModel<string> = {
  defaultColor: "000",
  toHsva: hexToHsva,
  fromHsva: ({ h, s, v }) => hsvaToHex({ h, s, v, a: 1 }),
  equal: equalHex,
};

export const HexColorPicker = (props: Partial<ColorPickerBaseProps<string>>): JSX.Element => {
  return <ColorPicker {...props} colorModel={hexColorModel} />
};
