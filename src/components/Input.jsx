import { forwardRef, useId, useState } from "react"
const Input=forwardRef(function({label,className,placeholder,type="text",...props},ref){
    const id=useId();
    const [inpvalue,setInpValue]=useState({placeholder});
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input {...props} id={id} onChange={(e)=>setInpValue(e.target.value)}  className={`${className} w-full
            px-4 py-3
            border border-gray-300
            rounded-lg
            bg-white
            text-gray-900
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition-all
            duration-200`} ref={ref} type={type} placeholder={placeholder}/>
        </div>
    )
})

export default Input;