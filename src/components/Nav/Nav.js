import { useContext, useState } from 'react'
import {
  Link,
  useNavigate,
  createSearchParams
} from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import { OrderBy } from './OrderBy'
import { SelectCategory } from './SelectCategory'
import { SortBy } from './SortBy'

export const Nav = () => {
  const [currentCategory, setCurrentCategory] = useState('Select Category')
  const [currentSort, setCurrentSort] = useState('Sort by')
  const [currentOrder, setCurrentOrder] = useState('desc')
  const navigate = useNavigate()
  const { user } = useContext(UserContext)


  const handleSubmit = e => {
    e.preventDefault()
    navigate('/', { replace: true })
    let sortByApi = currentSort.toLowerCase()
    if (currentSort === 'Date') sortByApi = 'created_at'
    else if (currentSort === 'Sort by') sortByApi = 'votes'
    else if (currentSort === 'Comments') sortByApi = 'comment_count'
    if (currentCategory === 'Select Category' || currentCategory === 'All') {

      navigate({
        pathname: '/',
        search: createSearchParams({
          sort_by: sortByApi,
          order: currentOrder
        }).toString()
      })
    } else if (currentCategory) {

      navigate({
        pathname: '/',
        search: createSearchParams({
          category: currentCategory,
          sort_by: sortByApi,
          order: currentOrder
        }).toString()
      })
    }
  }

  return (
    <nav>
      <section className='navContainer'>
        <Link
          className='linkText'
          to='/'
        >
          Home
        </Link>
        <form className='catForm' onSubmit={handleSubmit}>
          <div className='formFlex'>
            <SelectCategory setCurrentCategory={setCurrentCategory} />
            <SortBy setCurrentSort={setCurrentSort} />
            <OrderBy setCurrentOrder={setCurrentOrder} />
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
