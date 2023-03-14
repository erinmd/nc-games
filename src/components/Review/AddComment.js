import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/User'
import { postComment } from '../../utils/api'

export const AddComment = ({ setComments, review_id }) => {
  const [newComment, setNewComment] = useState('')
  const [loadingComment, setLoadingComment] = useState(false)
  const { user } = useContext(UserContext)

  const handleSubmit = event => {
    event.preventDefault()
    if (newComment.length > 0) {
      setLoadingComment(true)
      postComment(review_id, user.username, newComment).then(comment => {
        setComments(currComments => {
          return [comment, ...currComments]
        })
        setLoadingComment(false)
        setNewComment('')
      })
    }
  }
  return loadingComment ? (
    <p>Loading your comment...</p>
  ) : (
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
