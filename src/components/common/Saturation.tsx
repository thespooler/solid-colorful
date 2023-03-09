import { Interactive, Interaction } from "./Interactive";
import { Pointer } from "./Pointer";
import { hsvaToHslString } from "../../utils/convert";
import { clamp } from "../../utils/clamp";
import { round } from "../../utils/round";
import { useColorManipulationContext } from "../../hooks/ColorManipulationContext";

export const Saturation = () => {
  const { hsva, onChange } = useColorManipulationContext();
  const handleMove = (interaction: Interaction) => {
    onChange({
      s: interaction.left * 100,
      v: 100 - interaction.top * 100,
    });
  };

  const handleKey = (offset: Interaction) => {
    // Saturation and brightness always fit into [0, 100] range
    onChange({
      s: clamp(hsva().s + offset.left * 100, 0, 100),
      v: clamp(hsva().v - offset.top * 100, 0, 100),
    });
  };

  return (
    <div
      class="solid-colorful__saturation"
      style={{
        "background-color": hsvaToHslString({ h: hsva().h, s: 100, v: 100, a: 1 }),
      }}
    >
      <Interactive
        onMove={handleMove}
        onKey={handleKey}
        aria-label="Color"
        aria-valuetext={`Saturation ${round(hsva().s)}%, Brightness ${round(hsva().v)}%`}
      >
        <Pointer
          class="solid-colorful__saturation-pointer"
          top={1 - hsva().v / 100}
          left={hsva().s / 100}
          color={hsvaToHslString(hsva())}
        />
      </Interactive>
    </div>
  );
};
