import { cva, type VariantProps } from "cva";

const gameStatus = cva({
  base: "mx-auto rounded-sm mt-5 w-80 flex flex-col flex-wrap min-h-15 invisible justify-center items-center text-white",
  variants: {
    intent: {
      win: "bg-green-600 visible font-medium",
      lose: "bg-red-500 visible font-medium p-0.5",
      informational: "bg-violet-500 visible italic",
    },
  },
});

/**
 * interface for Game Status function
 */
interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gameStatus> {}

export default function GameStatus({
  className,
  intent,
  children,
}: ButtonProps) {
  return <div className={gameStatus({ intent, className })}>{children}</div>;
}
