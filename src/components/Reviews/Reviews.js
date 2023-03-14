import { useEffect, useState } from 'react'
import { getCategories, getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { useParams, useSearchParams } from 'react-router-dom'
import { formatCategoryName } from '../../utils/utils'

export const Reviews = ({ submittedSort, order }) => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { category_name } = useParams()
  const [catDescription, setCatDescription] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (submittedSort !== 'Sort by') setSearchParams({ sort_by: submittedSort, order})
  }, [submittedSort, setSearchParams, order])

  useEffect(() => {
    setIsLoading(true)
    let sortByApi = submittedSort.toLowerCase()
    if (submittedSort === 'Date') sortByApi = 'created_at'
    else if (submittedSort === 'Sort by') sortByApi = 'votes'
    else if (submittedSort === 'Comments') sortByApi = 'comment_count'
    getReviews(category_name, sortByApi, order).then(reviews => {
      setReviews(reviews)
      setIsLoading(false)
    })
  }, [category_name, submittedSort, order])

  useEffect(() => {
    if (category_name) {
      getCategories().then(categories => {
        const newDescription = categories.find(category => {
          return category.slug === category_name
        }).description
        setCatDescription(newDescription)
      })
    }
  }, [category_name])

  return (
    <section className='reviewsContainer'>
      {category_name ? (
        <h2 className='catHeader'>
          Category: {formatCategoryName(category_name)}
        </h2>
      ) : (
        <h2 className='catHeader'>All Games</h2>
      )}
      {category_name ? (
        <p className='catDescription'> Description: {catDescription}</p>
      ) : (
        ''
      )}
      {isLoading ? (
        <p className='initialPageLoad'>Loading...</p>
      ) : (
        <ol className='reviewsSection'>
          {reviews.map(review => {
            return <ReviewCard key={review.review_id} review={review} />
          })}
        </ol>
      )}
    </section>
  )
}
