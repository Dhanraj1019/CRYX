import { useState } from 'react'
import BinaryBg from './components/BinaryBg'
import './App.css'

function App() {

  return (
    <>
      <BinaryBg/>
      <div style={{position:'relative',zIndex:1}}>
        <h1>hello</h1>
      </div>
    </>
  )
}

export default App
