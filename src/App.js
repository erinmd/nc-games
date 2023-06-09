import { useContext } from 'react'
import { Route, Routes} from 'react-router-dom'
import './App.css'
import { ErrorPage } from './components/ErrorPage'
import { Header } from './components/Header'
import { Nav } from './components/Nav/Nav'
import { Review } from './components/Review/Review'
import { AddReview } from './components/Reviews/AddReview'
import { Reviews } from './components/Reviews/Reviews'
import { UserProfile } from './components/Users/UserProfile'
import { Users } from './components/Users/Users'
import { ThemeContext } from './contexts/Theme'

function App () {
  const {theme} = useContext(ThemeContext)
  const error = 'This page does not exist! Use the navigation bar to find what you need.'
  return (
    <main className={`appContainer ${theme}`}>
      <Nav />
      <Header />
      <Routes>
        <Route path='*' element={<ErrorPage error={error}/>} />
        <Route path='/' element={<Reviews/>} />
        <Route path='/reviews/:review_id' element={<Review />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:username' element={<UserProfile />}/>
        <Route path='/add-review' element = {<AddReview />} />
      </Routes>
    </main>
  )
}

export default App
