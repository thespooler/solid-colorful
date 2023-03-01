import { Component } from "solid-js";
import { formatClassName } from "../../utils/format";

interface Props {
  class?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer: Component<Props> = (props: Props) => {
  const nodeClassName = formatClassName(["react-colorful__pointer", props.class]);
  return (
    <div class={nodeClassName} style={{
      top: `${props.top! * 100}%`,
      left: `${props.left * 100}%`,
    }}>
      <div class="react-colorful__pointer-fill" style={{ "background-color": props.color }} />
    </div>
  );
};
