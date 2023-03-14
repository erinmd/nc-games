import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api'

export const SelectCategory = () => {
  const [categoryList, setCategoryList] = useState([])
  const [currentCategory, setCurrentCategory] = useState('Select Category')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getCategories().then(categories => {
      setCategoryList(categories)
      setIsLoading(false)
    })
  }, [])

  const categoryOptions = categoryList.map(category => {
    return <option key={category.slug} value={category.slug}>{category.slug}</option>
  })

  return (
    <select className='selectCategory' onChange={e => setCurrentCategory(e.target.value)}> 
    <option value='Select Category'>Select Category</option>
    <option value='All'>All</option>
      {isLoading ? <option>Loading...</option> : categoryOptions}
    </select>
  )
}
