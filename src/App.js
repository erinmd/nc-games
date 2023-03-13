import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { Reviews } from './components/Reviews/Reviews'

function App () {
  return (
    <main className='appContainer'>
      <Nav />
      <Header />
      <Routes>
        <Route path='/' element={<Reviews />} />
      </Routes>
    </main>
  )
}

export default App
