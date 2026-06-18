import {useForm} from 'react-hook-form'
import Input from '../Input'
import Button from '../Button/Button';
export default function Login(){
    const {handleSubmit,register}=useForm();
    const login=async (data)=>{
        console.log("data=",data);
    }
    return (
        <div>
            <h1 className="text-white">Login</h1>
            <form onSubmit={handleSubmit(login)}>
                <Input label="enter username" placeholder="user@111" {...register("username",{required:true})}/>
                <Input label="enter Password" type="password" placeholder="........" {...register("password",{required:true})}/>
                <Button type='submit' children="Login" className='w-full py-3 mt-2 font-semibold tracking-wide'/>
            </form>
        </div>
    )
}
