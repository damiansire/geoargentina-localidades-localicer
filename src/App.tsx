import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchWithDebounce from './components/search/search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchWithDebounce />
    </>
  )
}

export default App
