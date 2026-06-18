import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import {Link,useNavigate} from 'react-router-dom'
export default function AppBar(){
  const navigate=useNavigate();
  const navitems=[
    {
      title:"home",
      href:"/home"
    },
    {
      title:"about us",
      href:"/about-us"
    },
    {
      title:"contect us",
      href:"/contect-us"
    },
    {
      title:"login",
      href:"/login"
    },
  ]
  return (
    <div className="z-100 fixed top-0 w-full items-center pl-5 pr-5 pt-2 pb-2 flex justify-between bg-blue-800 font-medium text-green-400 text-2xl">
      <Logo/>
      <div>
        {
          // navitems.map((item)=><button className="cursor-pointer">{item.title}</button>)
          navitems.map((item)=><Button onClick={()=>navigate(item.href)} key={item.title} children={item.title}/>)
        }
      </div>
    </div>
  )
}
