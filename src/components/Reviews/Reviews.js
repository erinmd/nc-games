import { useEffect, useState } from 'react'
import { getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { SelectCategory } from './SelectCategory'

export const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getReviews().then(reviews => {
      setReviews(reviews)
      setIsLoading(false)
    })
  }, [])
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
