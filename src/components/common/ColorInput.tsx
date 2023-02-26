import { createEffect, createSignal, JSX } from "solid-js";
import { ColorInputBaseProps } from "../../types";

interface Props extends ColorInputBaseProps {
  /** Blocks typing invalid characters and limits string length */
  escape: (value: string) => string;
  /** Checks that value is valid color string */
  validate: (value: string) => boolean;
  /** Processes value before displaying it in the input */
  format?: (value: string) => string;
  /** Processes value before sending it in `onChange` */
  process?: (value: string) => string;
}

export const ColorInput = (props: Props): JSX.Element => {
  const { color = "", onChange, onBlur, escape, validate, format, process, ...rest } = props;
  const [value, setValue] = createSignal(escape(color));

  // Trigger `onChange` handler only if the input value is a valid color
  const handleChange = (e: Event & { currentTarget: HTMLInputElement; target: Element }) => {
    const inputValue = escape(e.currentTarget.value);
    setValue(inputValue);
    if (validate(inputValue) &&  onChange !== undefined) onChange(process ? process(inputValue) : inputValue);
  };

  // Take the color from props if the last typed color (in local state) is not valid
  const handleBlur = (e: FocusEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    if (!validate(e.currentTarget.value)) setValue(escape(color));
  };

  // Update the local state when `color` property value is changed
  createEffect(() => {
    setValue(escape(color));
  }, [color, escape]);

  return (
    <input
      {...rest}
      value={format ? format(value()) : value()}
      spellcheck={false} // the element should not be checked for spelling errors
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}
