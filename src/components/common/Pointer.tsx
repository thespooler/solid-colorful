import { Component, mergeProps } from "solid-js";
import { formatClassName } from "../../utils/format";

interface Props {
  class?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer: Component<Props> = (props: Props) => {
  const nodeClassName = formatClassName(["react-colorful__pointer", props.class]);
  const mergedProps = mergeProps({ top: 0.5 }, props);
  return (
    <div class={nodeClassName} style={{
      top: `${mergedProps.top * 100}%`,
      left: `${mergedProps.left * 100}%`,
    }}>
      <div class="react-colorful__pointer-fill" style={{ "background-color": props.color }} />
    </div>
  );
};
