import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/User'
import { SelectCategory } from './SelectCategory'

export const Nav = ({ currentCategory, setCurrentCategory }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const handleSubmit = e => {
    e.preventDefault()
    if (currentCategory !== 'Select Category') {
      if (currentCategory === 'All') navigate('/')
      else {
        navigate(`/reviews/category/${currentCategory}`)
      }
    }
  }

  return (
    <nav>
      <section className='navContainer'>
        <Link className='linkText' to='/'>
          Home
        </Link>
        <form className='catForm' onSubmit={handleSubmit}>
          <SelectCategory setCurrentCategory={setCurrentCategory} />
          <button className='navButton'> Go </button>
        </form>
      </section>
      <img
        className='navAvatar'
        src={user.avatar_url}
        alt={`Avatar for ${user.username}`}
      />
    </nav>
  )
}
