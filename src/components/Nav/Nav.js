import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import { SelectCategory } from './SelectCategory'
import { SortBy } from './SortBy'

export const Nav = ({setSubmittedSort}) => {
  const [currentCategory, setCurrentCategory] = useState('Select Category')
  const [currentSort, setCurrentSort] = useState('Sort by')
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  let path = '/'
  const handleSubmit = e => {
    e.preventDefault()
    setSubmittedSort(currentSort)
    if (currentCategory !== 'Select Category') {
      if (currentCategory !== 'All') {
        path = `/reviews/category/${currentCategory}`
      }
      navigate(path)
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
          <SortBy setCurrentSort={setCurrentSort}/>
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
