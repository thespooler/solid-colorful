import { JSX, splitProps } from "solid-js";
import { ColorInputBaseProps } from "../types";
import { validHex } from "../utils/validate";
import { ColorInput } from "./common/ColorInput";

interface HexColorInputProps extends ColorInputBaseProps {
  /** Enables `#` prefix displaying */
  prefixed?: boolean;
  /** Allows `#rgba` and `#rrggbbaa` color formats */
  alpha?: boolean;
}

/** Adds "#" symbol to the beginning of the string */
const prefix = (value: string | undefined) => value ? "#" + value : "";
const no_prefix = (value: string | undefined) => value ?? "";

export const HexColorInput = (props: HexColorInputProps): JSX.Element => {
  const [localprops, otherprops] = splitProps(props, ["prefixed", "alpha"]);
  return (
    <ColorInput
      {...otherprops}
      escape={(value: string) => value.replace(/([^0-9A-F]+)/gi, "").substring(0, localprops.alpha ? 8 : 6)}
      format={localprops.prefixed ? prefix : no_prefix }
      process={prefix}
      validate={(value: string) => validHex(value, localprops.alpha)}
    />
  );
};
