import { useContext, useEffect, useState } from 'react'
import { getReview } from '../../utils/api'
import { ReviewVoteButton } from './ReviewVoteButton'
import { useParams } from 'react-router-dom'
import { ErrorPage } from '../ErrorPage'
import { RemoveReview } from './RemoveReview'
import { UserContext } from '../../contexts/User'
import { formatCategoryName } from '../../utils/utils'
import { CommentPage } from './Comments/CommentPage'

export const Review = () => {
  const { review_id } = useParams()
  const [review, setReview] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [buttonMessage, setButtonMessage] = useState({ class: '', msg: '' })
  const [pathError, setPathError] = useState(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    setIsLoading(true)
    getReview(review_id)
      .then(review => {
        setReview(review)
        setIsLoading(false)
        const removeAllowed =
          user.username === review.owner &&
          review.comment_count === 0 &&
          review.votes === 0
        setShowRemoveButton(removeAllowed)
      })
      .catch(err => {
        if (err.response.status === 400) {
          setPathError('Please use a number to search for a review!')
        } else if (err.response.status === 404) {
          setPathError(
            'This review does not exist! Use the navigation bar to find what you need.'
          )
        } else {
          setPathError('Oops something went wrong!')
        }
      })
  }, [review_id, user.username])
  return pathError ? (
    <ErrorPage error={pathError} />
  ) : isLoading ? (
    <section className='singleReview'>
      <p>Loading...</p>
    </section>
  ) : (
    <section className='singleReview'>
      <h2>{review.title}</h2>
      <p>Designer: {review.designer}</p>
      <img
        className='reviewImage'
        src={review.review_img_url}
        alt={review.title}
      />
      <p>Review:</p>
      <p>{review.review_body}</p>
      <p>Category: {formatCategoryName(review.category)}</p>
      <p>Owner: {review.owner}</p>
      <p>Created at: {new Date(review.created_at).toDateString()}</p>
      <p>Comments: {review.comment_count}</p>
      <p>Votes: {review.votes} </p>
      <ReviewVoteButton
        review_id={review_id}
        setReview={setReview}
        setButtonMessage={setButtonMessage}
      />
      {buttonMessage ? (
        <p className={buttonMessage.class}>{buttonMessage.msg}</p>
      ) : (
        ''
      )}
      {showRemoveButton ? <RemoveReview reviewId={review_id} /> : ''}
      <CommentPage review_id={review_id} />
    </section>
  )
}
