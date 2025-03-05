

export default function Badge({ children, className, ...rest}: React.ComponentPropsWithoutRef<"span">){
   
    return <span className={`drop-shadow-md p-1 rounded-sm font-bold text-md ${className}`} {...rest}>{children}</span>
}