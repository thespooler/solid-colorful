import { JSX, mergeProps, splitProps } from "solid-js";
import { ColorInputBaseProps } from "../../types";

interface Props extends ColorInputBaseProps {
  /** Blocks typing invalid characters and limits string length */
  escape: (value: string) => string;
  /** Checks that value is valid color string */
  validate: (value: string) => boolean;
  /** Processes value before displaying it in the input */
  format?: (value: string | undefined) => string;
  /** Processes value before sending it in `onChange` */
  process?: (value: string) => string;
}

export const ColorInput = (props: Props): JSX.Element => {
  // eslint-disable-next-line prefer-const
  let input: HTMLInputElement | undefined = undefined;

  const [localprops, otherprops] = splitProps(props, [
    "onBlur",
    "onChange",
    "color",
    "process",
    "validate",
    "format",
    "escape",
  ]);

  const mergedlocalprops = mergeProps(
    {
      format: (f: string | undefined) => f ?? "",
      process: (p: string) => p,
    },
    localprops
  );

  // Trigger `onChange` handler only if the input value is a valid color
  const handleChange = (e: Event & { currentTarget: HTMLInputElement; target: Element }) => {
    const inputValue = localprops.escape(e.currentTarget.value);
    if (localprops.validate(inputValue) && localprops.onChange !== undefined) {
      localprops.onChange(mergedlocalprops.process(inputValue));
    }
  };

  // Take the color from props if the last typed color (in local state) is not valid
  const handleBlur = (e: FocusEvent & { currentTarget: HTMLInputElement; target: Element }) => {
    if (!localprops.validate(e.currentTarget.value)) {
      // Forecully reset textbox value
      if (input !== undefined) input.value = mergedlocalprops.format(localprops.color ?? "");
    }
    const onBlur = localprops.onBlur as JSX.EventHandler<HTMLInputElement, FocusEvent>;
    if (onBlur !== undefined) {
      onBlur(e);
    }
  };

  return (
    <input
      {...otherprops}
      ref={input}
      value={localprops.color}
      spellcheck={false} // the element should not be checked for spelling errors
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
