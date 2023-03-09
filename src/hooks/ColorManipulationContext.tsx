import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  ParentProps,
  untrack,
  useContext,
} from "solid-js";
import { createContext } from "solid-js";
import { ColorModel, AnyColor, HsvaColor } from "../types";
import { equalColorObjects } from "../utils/compare";

export type ColorManipulationProps<T extends AnyColor> = {
  color: T;
  colormodel: ColorModel<T>;
  onChange?: (color: T) => void;
};
export type ColorManipulationContextType = {
  hsva: Accessor<HsvaColor>;
  onChange: (params: Partial<HsvaColor>) => void;
};

const defaultHsva = createMemo<HsvaColor>(() => ({ h: 0, s: 0, v: 0, a: 1 }));
const ColorManipulationContext = createContext<ColorManipulationContextType>({
  hsva: defaultHsva,
  onChange: () => undefined,
});

export const ColorManipulationProvider = <T extends AnyColor>(
  props: ParentProps<ColorManipulationProps<T>>
) => {
  // No matter which color model is used (HEX, RGB(A) or HSL(A)),
  // all internal calculations are based on HSVA model
  const [hsva, updateHsva] = createSignal<HsvaColor>(
    untrack(() => props.colormodel.toHsva(props.color))
  );
  let cache = { color: untrack(() => props.color), hsva: untrack(() => hsva()) };

  // Update local HSVA-value if `color` property value is changed,
  // but only if that's not the same color that we just sent to the parent
  createEffect(() => {
    if (!props.colormodel.equal(props.color, cache.color)) {
      const newHsva = props.colormodel.toHsva(props.color);
      cache = { color: props.color, hsva: newHsva };
      updateHsva(newHsva);
    }
  });

  // Trigger `onChange` callback only if an updated color is different from cached one;
  // save the new color to the ref to prevent unnecessary updates
  createEffect(() => {
    const hsva_i = hsva();
    const newColor = props.colormodel.fromHsva(hsva_i);
    if (!equalColorObjects(hsva_i, cache.hsva) && !props.colormodel.equal(newColor, cache.color)) {
      cache = untrack(() => ({ color: newColor, hsva: hsva_i }));
      if (props.onChange) {
        props.onChange(props.colormodel.fromHsva(hsva()));
      }
    }
  });

  const onChange = (params: Partial<HsvaColor>) => {
    updateHsva((current) => {
      const merged = mergeProps(current, params);
      return merged;
    });
  };

  const value = { hsva, onChange } as const;

  return (
    <ColorManipulationContext.Provider value={value}>
      {props.children}
    </ColorManipulationContext.Provider>
  );
};

export const useColorManipulationContext = () => useContext(ColorManipulationContext);
