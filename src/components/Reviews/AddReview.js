import { useState } from 'react'
import { AddReviewForm } from './AddReviewForm'

export const AddReview = () => {
  const [newReview, setNewReview] = useState(null)
  return (
    <section className='addReview'>
      <h2>Add Review</h2>
      <AddReviewForm setNewReview={setNewReview} />
    </section>
  )
}
