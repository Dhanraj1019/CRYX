import { useState } from 'react'
import BinaryBg from './components/BinaryBg'
import './App.css'
import Terminal from './components/Terminal/Terminal'

function App() {

  return (
    <>
      <BinaryBg/>
      <Terminal/>
      <div style={{position:'relative',zIndex:1}}>
        <h1>hello</h1>
      </div>
    </>
  )
}

export default App
