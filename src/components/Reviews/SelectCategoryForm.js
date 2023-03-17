import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api'
import { formatCategoryName } from '../../utils/utils'

export const SelectCategoryForm = ({ setCurrentCategory, setFeedback, feedback }) => {
  const [categoryList, setCategoryList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getCategories().then(categories => {
      setCategoryList(categories)
      setIsLoading(false)
    })
  }, [])

  const categoryOptions = categoryList.map(category => {
    return (
      <option key={category.slug} value={category.slug}>
        {formatCategoryName(category.slug)}
      </option>
    )
  })

  return (
    <select className='addReviewCat' onBlur={e => {
        if (e.target.value=== 'Select Category') {
          setFeedback({
            ...feedback,
            category: { msg: 'You must select a category', class: 'error formMsg' }
          })
        } else {
            setFeedback({
                ...feedback,
                category: { msg: '', class: 'success' }
            })
        }
      }}
      onChange={e => setCurrentCategory(e.target.value)}
    >
      <option value='Select Category'>Select Category</option>
      {isLoading ? <option>Loading...</option> : categoryOptions}
    </select>
  )
}
