import { createEffect, createSignal, JSX, mergeProps, splitProps, untrack } from "solid-js";
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
  const [localprops, otherprops] = splitProps(props, [
    "onBlur",
    "onChange",
    "color",
    "process",
    "validate",
    "format",
    "escape",
  ]);
  const [value, setValue] = createSignal(
    untrack(() => (localprops.color ? localprops.escape(localprops.color) : undefined))
  );
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
    if (localprops.validate(inputValue)) {
      setValue(inputValue);
    }
  };

  // Take the color from props if the last typed color (in local state) is not valid
  const handleBlur = (e: FocusEvent & { currentTarget: HTMLInputElement; target: Element }) => {
    if (!localprops.validate(e.currentTarget.value)) {
      const colorValue = localprops.color ? localprops.escape(localprops.color) : undefined;
      setValue(colorValue);
    }
    const onBlur = localprops.onBlur as JSX.EventHandler<HTMLInputElement, FocusEvent>;
    if (onBlur !== undefined) {
      onBlur(e);
    }
  };

  createEffect(() => {
    setValue(localprops.color ? localprops.escape(localprops.color) : undefined);
  });

  createEffect(() => {
    const valid_value = value();
    if (localprops.onChange !== undefined && valid_value !== undefined) {
      localprops.onChange(mergedlocalprops.process(valid_value));
    }
  });

  return (
    <input
      {...otherprops}
      value={mergedlocalprops.format(value())}
      spellcheck={false} // the element should not be checked for spelling errors
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
