import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Nav } from './components/Nav/Nav'
import { Review } from './components/Review/Review'
import { Reviews } from './components/Reviews/Reviews'

function App () {
  const [submittedSort, setSubmittedSort] = useState('Sort by')
  const [order, setOrder] = useState('desc')
  return (
    <main className='appContainer'>
      <Nav setSubmittedSort={setSubmittedSort} setOrder={setOrder}
      />
      <Header />
      <Routes>
        <Route path='/*' element={<Reviews submittedSort={submittedSort} order={order}/>} />
        <Route
          path='/reviews/category/:category_name/*'
          element={<Reviews submittedSort={submittedSort} order={order}/>}
        />
        <Route path='/reviews/:review_id' element={<Review />} />
      </Routes>
    </main>
  )
}

export default App
