import { cva, type RecipeVariant } from "../../styled-system/css";

const gameStatus = cva({
  base: {
    marginInline: "auto",
    rounded: "sm",
    mt: "5",
    w: "80",
    display: "flex",
    flexDir: "column",
    flexWrap: "wrap",
    visibility: "hidden",
    justifyContent: "center",
    alignItems: "center",
    minBlockSize: "var(--min-height)",
    color: "white",
  },
  variants: {
    intent: {
      win: {
        bgColor: "intent.success",
        visibility: "visible",
        fontWeight: "medium",
      },
      lose: {
        bgColor: "intent.danger",
        visibility: "visible",
        fontWeight: "medium",
        p: "0.5",
      },
      informational: {
        bgColor: "intent.info",
        visibility: "visible",
        fontStyle: "italic",
      },
    },
  },
});

interface GameStatusProps extends RecipeVariant<typeof gameStatus> {
  children: React.ReactNode;
}

export default function GameStatus({ intent, children }: GameStatusProps) {
  return <div className={gameStatus({ intent })}>{children}</div>;
}
