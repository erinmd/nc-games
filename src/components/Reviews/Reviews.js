import { useEffect, useState } from 'react'
import { getCategories, getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { useParams } from 'react-router-dom'
import { formatCategoryName } from '../../utils/utils'

export const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { category_name } = useParams()
  const [catDescription, setCatDescription] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getReviews(category_name).then(reviews => {
      setReviews(reviews)
      setIsLoading(false)
    })
  }, [category_name])

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
    <section>
      {category_name ? (
        <h2 className='catHeader'>
          Category: {formatCategoryName(category_name)}
        </h2>
      ) : (
        <h2 className='catHeader'>All Games</h2>
      )}
      {category_name ? (
        <p className='catDescription'>Description: {catDescription}</p>
      ) : (
        ''
      )}
      {isLoading ? (
        <p>Loading...</p>
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
