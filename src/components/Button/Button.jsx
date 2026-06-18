export default function Button({children,className,...props}){
    return(
        <button className={`${className} ml-2.5 p-3 border rounded-2xl bg-blue-700 cursor-pointer text-white`} {...props}>
            {children}
        </button>
    )
}