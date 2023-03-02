import { JSX } from "solid-js";

import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";

import { hsvaToHslaString } from "../../utils/convert";
import { formatClassName } from "../../utils/format";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { HsvaColor } from "../../types";

interface Props {
  class?: string;
  hsva: HsvaColor;
  onChange: (newAlpha: { a: number }) => void;
}

export const Alpha = (props: Props): JSX.Element => {
  const handleMove = (interaction: Interaction) => {
    props.onChange({ a: interaction.left });
  };

  const handleKey = (offset: Interaction) => {
    // Alpha always fit into [0, 1] range
    props.onChange({ a: clamp(props.hsva.a + offset.left) });
  };

  const nodeClassName = formatClassName(["solid-colorful__alpha", props.class]);

  return (
    <div class={nodeClassName}>
      <div
        class="solid-colorful__alpha-gradient"
        style={{
          "background-image": `linear-gradient(90deg, ${hsvaToHslaString({ ...props.hsva, a: 0 })},
          ${hsvaToHslaString({ ...props.hsva, a: 1 })})`,
        }}
      />
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Alpha"
        aria-valuetext={`${round(props.hsva.a * 100)}%`}
        aria-valuenow={round(props.hsva.a * 100)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <Pointer
          class="solid-colorful__alpha-pointer"
          left={props.hsva.a}
          color={hsvaToHslaString(props.hsva)}
        />
      </Interactive>
    </div>
  );
};
