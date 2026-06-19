import BinaryBg from './components/BinaryBg'
import AppBar from './components/AppBar/AppBar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {login as stateLogin,logout as stateLogout} from '../store/AuthSclice';
import supabase from '../Supabase/Supabase'


function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      
      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        const redux_data={user:session.user,session:session};
        dispatch(stateLogin(redux_data));
      } else if (event === 'SIGNED_OUT') {
        dispatch(stateLogout());
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    })

  // call unsubscribe to remove the callback
  return ()=>{
    data.subscription.unsubscribe()
  }

  },[]);


  return (
    <div className="min-h-screen flex flex-col relative">
      <BinaryBg/>
      <AppBar/>
      <div className='h-20'></div>
      <main className='flex-1 relative z-10'>
        <Outlet/>
      </main>
      <div className='h-20'></div>
      <Footer/>
    </div>
  )
}

export default App
