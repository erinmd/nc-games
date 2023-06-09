import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import { postReview } from '../../utils/api'

export const DisplayNewReview = ({ review, setNewReview }) => {
  const { user } = useContext(UserContext)
  const [message, setMessage] = useState(
    'Check your review is correct before submitting.'
  )
  const [imageMessage, setImageMessage] = useState('')
  const navigate = useNavigate()

  const addDefaultSrc = e => {
    setNewReview({
      ...review,
      image: 'https://cdn-icons-png.flaticon.com/512/3813/3813719.png'
    })
    setImageMessage(
      'Either you did not provide an image or the URL did not work, so a default image has been set.'
    )
  }

  const submitForm = e => {
    e.preventDefault()
    setMessage('Adding your review to the webite...')
    postReview({ ...review, owner: user.username })
      .then(review => {
        setMessage('Your review was successfully added!')
      })
      .catch(err => {
        setMessage('Something went wrong.. Try again')
      })
  }

  return (
    <section className='newReviewContainer'>
      <h3>{message}</h3>
      <section className='singleReview newReview'>
        <h4>{review.title}</h4>
        <p>Designer: {review.designer}</p>
        <img
          onError={addDefaultSrc}
          className='reviewImage'
          src={review.image}
          alt={review.title}
        />
        <p className='success'>{imageMessage}</p>
        <p>Review: {review.body}</p>
        <p>Category: {review.category}</p>
        <p>Owner: {user.username}</p>
        <p>Created at: {new Date(Date.now()).toDateString()}</p>
        <p>Votes: 0 Comments: 0</p>
        <section>
          {message === 'Your review was successfully added!' ? (
            <button onClick={() => navigate('/')}>Back to home</button>
          ) : (
            <button className='newReviewSubmit' onClick={submitForm}>
              Confirm
            </button>
          )}
          <button className='resetButton' onClick={() => setNewReview(null)}>
            Reset
          </button>
        </section>
      </section>
    </section>
  )
}
