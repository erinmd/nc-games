import { useContext, useState } from 'react'
import { UserContext } from '../../../contexts/User'
import { postComment } from '../../../utils/api'

export const AddComment = ({ setComments, review_id, setMessage, setPage }) => {
  const [newComment, setNewComment] = useState('')
  const { user } = useContext(UserContext)

  const handleSubmit = event => {
    event.preventDefault()
    if (newComment.length > 0) {
      setMessage({ msg: 'Loading your comment...', class: 'loading' })
      setPage(1)
      postComment(review_id, user.username, newComment)
        .then(comment => {
          setComments(currComments => {
            return [comment, ...currComments]
          })
          setNewComment('')
          setMessage({
            msg: 'Your comment was posted successfully!',
            class: 'success'
          })
        })
        .catch(() => {
          setMessage({
            msg: 'Oops, something went wrong! Please try again',
            class: 'error'
          })
        })
    } else {
      setMessage({ msg: 'You must enter a comment first!', class: 'error' })
    }
  }
  return (
    <form className='commentCard' onSubmit={handleSubmit}>
      <textarea
        placeholder='Type your comment here...'
        className='textBox'
        id='newComment'
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
      />
      <button className='commentButton'>Submit</button>
    </form>
  )
}
