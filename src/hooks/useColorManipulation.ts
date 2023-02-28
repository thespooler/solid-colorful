import { Accessor, createEffect, createMemo, createSignal, mergeProps, untrack } from "solid-js";
import { ColorModel, AnyColor, HsvaColor } from "../types";
import { equalColorObjects } from "../utils/compare";

export function useColorManipulation<T extends AnyColor>(
  colorModel: ColorModel<T>,
  color: T,
  onChange?: (color: T) => void
): [Accessor<HsvaColor>, (color: Partial<HsvaColor>) => void] {

  // No matter which color model is used (HEX, RGB(A) or HSL(A)),
  // all internal calculations are based on HSVA model
  const [hsva, updateHsva] = createSignal<HsvaColor>(colorModel.toHsva(color));
  let cache = createMemo(() => untrack(() => ({ color, hsva: hsva() })));
    
  // Update local HSVA-value if `color` property value is changed,
  // but only if that's not the same color that we just sent to the parent
  createEffect(() => {
    if (!colorModel.equal(color, cache().color)) {
      const newHsva = colorModel.toHsva(color);
      cache = createMemo(() => untrack(() => ({ color, hsva: hsva() })));
      updateHsva(newHsva);
    }
  });

  // Trigger `onChange` callback only if an updated color is different from cached one;
  // save the new color to the ref to prevent unnecessary updates
  createEffect(() => {
    if (!colorModel.equal(color, cache().color)) {
      const newHsva = colorModel.toHsva(color);
      cache = createMemo(() => untrack(() => ({ color, hsva: newHsva })));
      updateHsva(newHsva);
    }
  });
  
  createEffect(() => {
    let newColor = colorModel.fromHsva(hsva());
    if (
      !equalColorObjects(hsva(), cache().hsva) &&
      !colorModel.equal(newColor, cache().color)
    ) {
      cache = createMemo(() => untrack(() => ({ color: newColor, hsva: hsva() })));
      if (onChange !== undefined) { onChange(newColor); }
    }
  });

  // Merge the current HSVA color object with updated params.
  // For example, when a child component sends `h` or `s` only
  const handleChange = (params: Partial<HsvaColor>) => {
    updateHsva((current) => mergeProps(current, params));
  };

  return [hsva, handleChange];
}
