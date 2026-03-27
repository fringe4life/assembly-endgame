import { cva, type RecipeVariant } from "../../styled-system/css";

const span = cva({
  base: {
    fontSize: "lg",
    lineHeight: "lg",
    fontWeight: "bold",
    flexBasis: "10",
    pt: "1.5",
    pb: "1.5",
    textAlign: "center",
    textTransform: "uppercase",
    cursor: "default",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
  },
  variants: {
    intent: {
      unguessed: {
        color: "white/0",
        borderBlockEndColor: "white",
        _selection: { color: "white/0" },
        userSelect: "none",
      },
      correct: {
        color: "white",
        borderBlockEndColor: "b.green-600",
        cursor: "text",
      },
      wrong: {
        color: "red.500",
        borderBlockEndColor: "b.red-500",
        cursor: "crosshair",
      },
    },
  },
});

export interface GuessLetterProps extends RecipeVariant<typeof span> {
  children: React.ReactNode;
}

export default function GuessLetter({ intent, children }: GuessLetterProps) {
  return <span className={span({ intent })}>{children}</span>;
}
