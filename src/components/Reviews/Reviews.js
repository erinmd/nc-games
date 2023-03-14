import { useEffect, useState } from 'react'
import { getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { useParams } from 'react-router-dom'

export const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { category_name } = useParams()

  useEffect(() => {
    setIsLoading(true)
    getReviews(category_name).then(reviews => {
      setReviews(reviews)
      setIsLoading(false)
    })
  }, [category_name])
  return (
    <section>
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
