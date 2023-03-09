import { JSX } from "solid-js";

import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslaString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { useColorManipulationContext } from "../../hooks/ColorManipulationContext";

interface Props {
  class?: string;
}

export const Alpha = (props: Props): JSX.Element => {
  const { hsva, onChange } = useColorManipulationContext();
  const handleMove = (interaction: Interaction) => {
    onChange({ a: interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Alpha always fit into [0, 1] range
    onChange({ a: clamp(hsva().a + offset.left) });
  };

  return (
    <div class={formatClassName(["solid-colorful__alpha", props.class])}>
      <div
        class="solid-colorful__alpha-gradient"
        style={{
          "background-image": `linear-gradient(90deg, ${hsvaToHslaString({ ...hsva(), a: 0 })},
          ${hsvaToHslaString({ ...hsva(), a: 1 })})`,
        }}
      />
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${round(hsva().a * 100)}%`}
        aria-valuenow={round(hsva().a * 100)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <Pointer
          class="solid-colorful__alpha-pointer"
          left={hsva().a}
          color={hsvaToHslaString(hsva())}
        />
      </Interactive>
    </div>
  );
};
