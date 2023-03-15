import { useContext, useState } from 'react'
import { UserContext } from '../../../contexts/User'
import { DeleteComment } from './DeleteComment'

export const CommentCard = ({ comment, setComments }) => {
  const { user } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState(null)
  return (
    <li className='commentCard'>
      <p>Author: {comment.author}</p>
      <p className='commentText'>Comment: {comment.body}</p>
      <p>Date: {new Date(comment.created_at).toString().slice(0, 24)}</p>
      <p>Votes: {comment.votes}</p>
      {comment.author === user.username ? (
        <section className='removeSection'>
          <DeleteComment
            setComments={setComments}
            commentId={comment.comment_id}
            setErrorMessage={setErrorMessage}
          />
          {errorMessage ? (
            <p className='error deleteError'>{errorMessage}</p>
          ) : (
            ''
          )}
        </section>
      ) : (
        ''
      )}
    </li>
  )
}
