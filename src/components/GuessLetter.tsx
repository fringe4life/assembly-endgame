import { cva, type VariantProps } from "cva";

const span = cva({
  base: "text-lg font-bold flex-0 basis-10 py-1.5 bg-guess border-b-1 text-center uppercase cursor-default",
  variants: {
    intent: {
      unguessed: "text-white/0 border-b-white selection:text-white/0",
      correct: "text-white border-b-green-600 cursor-text",
      wrong: "text-red-500 border-b-red-500 cursor-crosshair",
    },
  },
});

/**
 * interface for Key class
 */
export interface SpanProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof span> {}

export default function GuessLetter({
  intent,
  className,
  children,
}: SpanProps) {
  return <span className={span({ intent, className })}>{children}</span>;
}
