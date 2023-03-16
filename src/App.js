import { Route, Routes, useSearchParams } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Nav } from './components/Nav/Nav'
import { Review } from './components/Review/Review'
import { Reviews } from './components/Reviews/Reviews'
import { Users } from './components/Users/Users'

function App () {
  const [searchParams] = useSearchParams()
  return (
    <main className='appContainer'>
      <Nav 
      />
      <Header />
      <Routes>
        <Route path='/*' element={<Reviews searchParams={searchParams}/>} />
        <Route path='/reviews/:review_id' element={<Review />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </main>
  )
}

export default App
