import { Link, useNavigate } from 'react-router-dom'
import { SelectCategory } from './SelectCategory'

export const Nav = ({
  currentCategory,
  setCurrentCategory,
}) => {
  const navigate = useNavigate()

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
      <Link className='linkText' to='/'>
        Home
      </Link>
      <form onSubmit={handleSubmit}>
        <SelectCategory setCurrentCategory={setCurrentCategory} />
        <button className='navButton'> Go </button>
      </form>
    </nav>
  )
}
