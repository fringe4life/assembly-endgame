import { css } from "../../styled-system/css";

export default function NewGame({
  children,
  ...rest
}: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      className={css({
        h: "10",
        w: "228",
        cursor: "pointer",
        rounded: "sm",
        bgColor: "sky.400",
        color: "neutral.900",
        _hover: {
          bgColor: "sky.300",
        },
        _active: {
          bgColor: "sky.600",
        },
        _focus: {
          outlineWidth: "4px",
          outlineStyle: "solid",
          outlineColor: "green.600",
        },
      })}
      type="reset"
      {...rest}
    >
      {children}
    </button>
  );
}
