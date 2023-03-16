import { useState } from 'react'
import { AddReviewForm } from './AddReviewForm'
import { DisplayNewReview } from './DisplayNewReview'

export const AddReview = () => {
  const [newReview, setNewReview] = useState(null)
  return (
    <section className='addReview'>
      <h2>Add Review</h2>
      {newReview? <DisplayNewReview review={newReview} setNewReview={setNewReview}/> :<AddReviewForm setNewReview={setNewReview} />}
    </section>
  )
}
