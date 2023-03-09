import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { useColorManipulationContext } from "../../hooks/ColorManipulationContext";

interface Props {
  class?: string;
}

const HueBase = (props: Props) => {
  const { hsva, onChange } = useColorManipulationContext();
  const handleMove = (interaction: Interaction) => {
    onChange({ h: 360 * interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    onChange({
      h: clamp(hsva().h + offset.left * 360, 0, 360),
    });
  };

  return (
    <div class={formatClassName(["solid-colorful__hue", props.class])}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuenow={round(hsva().h)}
        aria-valuemax="360"
        aria-valuemin="0"
      >
        <Pointer
          class="solid-colorful__hue-pointer"
          left={hsva().h / 360}
          color={hsvaToHslString({ h: hsva().h, s: 100, v: 100, a: 1 })}
        />
      </Interactive>
    </div>
  );
};

// export const Hue = useMemo(HueBase);
export const Hue = HueBase;
