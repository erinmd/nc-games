import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { Review } from './components/Review/Review'
import { Reviews } from './components/Reviews/Reviews'

function App () {
  const [currentCategory, setCurrentCategory] = useState('Select Category')
  return (
    <main className='appContainer'>
      <Nav currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      <Header />
      <Routes>
        <Route path='/' element={<Reviews />} />
        <Route path='/reviews/category/:category_name' element={<Reviews/>} />
        <Route path='/reviews/:review_id' element={<Review />} />
      </Routes>
    </main>
  )
}

export default App
