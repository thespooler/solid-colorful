import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";

interface Props {
  class?: string;
  hue: number;
  onChange: (newHue: { h: number }) => void;
}

const HueBase = (props: Props) => {
  const handleMove = (interaction: Interaction) => {
    props.onChange({ h: 360 * interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Hue measured in degrees of the color circle ranging from 0 to 360
    props.onChange({
      h: clamp(props.hue + offset.left * 360, 0, 360),
    });
  };

  return (
    <div class={formatClassName(["solid-colorful__hue", props.class])}>
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Hue"
        aria-valuenow={round(props.hue)}
        aria-valuemax="360"
        aria-valuemin="0"
      >
        <Pointer
          class="solid-colorful__hue-pointer"
          left={props.hue / 360}
          color={hsvaToHslString({ h: props.hue, s: 100, v: 100, a: 1 })}
        />
      </Interactive>
    </div>
  );
};

// export const Hue = useMemo(HueBase);
export const Hue = HueBase;
