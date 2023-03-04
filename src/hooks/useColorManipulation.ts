import { createEffect, createSignal, mergeProps, untrack } from "solid-js";
import { ColorModel, AnyColor, HsvaColor } from "../types";
import { equalColorObjects } from "../utils/compare";

export function createColorManipulation<T extends AnyColor>(
  colorModel: ColorModel<T>,
  color: T,
  onChange?: (color: T) => void
) {
  // No matter which color model is used (HEX, RGB(A) or HSL(A)),
  // all internal calculations are based on HSVA model
  const [hsva, updateHsva] = createSignal<HsvaColor>(colorModel.toHsva(color));
  let cache = { color, hsva: untrack(() => hsva()) };

  // Update local HSVA-value if `color` property value is changed,
  // but only if that's not the same color that we just sent to the parent
  createEffect(() => {
    if (!colorModel.equal(color, cache.color)) {
      const newHsva = colorModel.toHsva(color);
      cache = { color, hsva: newHsva };
      updateHsva(newHsva);
    }
  });

  // Trigger `onChange` callback only if an updated color is different from cached one;
  // save the new color to the ref to prevent unnecessary updates
  createEffect(() => {
    const hsva_i = hsva();
    const newColor = colorModel.fromHsva(hsva_i);
    if (!equalColorObjects(hsva_i, cache.hsva) && !colorModel.equal(newColor, cache.color)) {
      cache = untrack(() => ({ color: newColor, hsva: hsva_i }));
      if (onChange !== undefined) onChange(newColor);
    }
  });

  const handleChange = (params: Partial<HsvaColor>) => {
    updateHsva((current) => {
      const merged = mergeProps(current, params);
      return merged;
    });
  };

  return [{ hsva }, { handleChange }] as const;
}
