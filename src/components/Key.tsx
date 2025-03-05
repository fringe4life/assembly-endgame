import { cva, type VariantProps } from "cva";

const button = cva({
    base: "text-neutral-900  uppercase font-semibold w-10 h-10 rounded-md",
    variants: {
        intent: {
            unpressed: 'bg-amber-400 cursor-pointer active:translate-y-0 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-sm hover:shadow-gray-500 scale-110',
            correct: 'bg-green-600 cursor-not-allowed hover:scale-0.90 ',
            wrong: 'bg-red-500 cursor-not-allowed hover:scale-0.90'
        },
    },
    defaultVariants: {
        intent: "unpressed",
    },
})

/**
 * interface for Key class
 */
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}


const Key: React.FC<ButtonProps> = ({className,  intent, onClick, children}) => {
    return (
        <button type="button" onClick={onClick} className={button({ intent, className })}>
            {children}
        </button>
    )
}


export default Key