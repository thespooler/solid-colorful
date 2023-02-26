import { JSX } from "solid-js";
import { formatClassName } from "../../utils/format";

interface Props {
  class?: string;
  top?: number;
  left: number;
  color: string;
}

export const Pointer = (props: Props): JSX.Element => {
  let {top, left, color} = props;
  const nodeClassName = formatClassName(["react-colorful__pointer", props.class]);

  const style = {
    top: `${top! * 100}%`,
    left: `${left * 100}%`,
  };

  return (
    <div class={nodeClassName} style={style}>
      <div class="react-colorful__pointer-fill" style={{ "background-color": color }} />
    </div>
  );
};
