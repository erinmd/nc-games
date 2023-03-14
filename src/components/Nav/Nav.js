import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import { OrderBy } from './OrderBy'
import { SelectCategory } from './SelectCategory'
import { SortBy } from './SortBy'

export const Nav = ({setSubmittedSort, setOrder}) => {
  const [currentCategory, setCurrentCategory] = useState('Select Category')
  const [currentSort, setCurrentSort] = useState('Sort by')
  const [currentOrder, setCurrentOrder] = useState('desc')
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  let path = '/'
  const handleSubmit = e => {
    e.preventDefault()
    setSubmittedSort(currentSort)
    setOrder(currentOrder)
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
          <div className='formFlex'>
          <SelectCategory setCurrentCategory={setCurrentCategory} />
          <SortBy setCurrentSort={setCurrentSort}/>
          <OrderBy setCurrentOrder={setCurrentOrder}/>
          </div>
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
