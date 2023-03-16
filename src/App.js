import { Route, Routes} from 'react-router-dom'
import './App.css'
import { ErrorPage } from './components/ErrorPage'
import { Header } from './components/Header'
import { Nav } from './components/Nav/Nav'
import { Review } from './components/Review/Review'
import { Reviews } from './components/Reviews/Reviews'
import { Users } from './components/Users/Users'

function App () {

  const error = 'This page does not exist! Use the navigation bar to find what you need.'
  return (
    <main className='appContainer'>
      <Nav />
      <Header />
      <Routes>
        <Route path='*' element={<ErrorPage error={error}/>} />
        <Route path='/' element={<Reviews/>} />
        <Route path='/reviews/:review_id' element={<Review />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </main>
  )
}

export default App
