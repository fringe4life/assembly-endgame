
export default function Button({ children, className, ...rest}: React.ComponentPropsWithoutRef<"button">){
    return (
        <button {...rest} type="button" className={ `cursor-pointer px-4 py-2 rounded-md  ${className}`}>{children}</button>
    )
}