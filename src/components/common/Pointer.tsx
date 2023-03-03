import { Component, mergeProps } from "solid-js";
import { formatClassName } from "../../utils/format";

interface Props {
  class?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer: Component<Props> = (props: Props) => {
  const mergedProps = mergeProps({ top: 0.5 }, props);
  return (
    <div
      class={formatClassName(["solid-colorful__pointer", props.class])}
      style={{
        top: `${mergedProps.top * 100}%`,
        left: `${mergedProps.left * 100}%`,
      }}
    >
      <div class="solid-colorful__pointer-fill" style={{ "background-color": props.color }} />
    </div>
  );
};
