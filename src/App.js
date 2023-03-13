import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { Review } from './components/Review/Review'
import { Reviews } from './components/Reviews/Reviews'

function App () {
  return (
    <main className='appContainer'>
      <Nav />
      <Header />
      <Routes>
        <Route path='/' element={<Reviews />} />
        <Route path='/reviews/:review_id' element={<Review />} />
      </Routes>
    </main>
  )
}

export default App
