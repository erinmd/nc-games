import { useContext, useState } from 'react'
import { UserContext } from '../../../contexts/User'
import { CommentVoteButton } from './CommentVote'
import { DeleteComment } from './DeleteComment'

export const CommentCard = ({ comment, setComments }) => {
  const { user } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState(null)
  const [deleteSuccessful, setDeleteSuccessful] = useState(false)
  const [commentVote, setCommentVote] = useState(comment.votes)
  const [buttonMessage, setButtonMessage] = useState({msg: '', class:'none'})

  return (
    <li className='commentCard'>
      {deleteSuccessful ? <p className='success'>Comment removed successfully</p> : <>
      <p>Author: {comment.author}</p>
      <p className='commentText'>Comment: {comment.body}</p>
      <p>Date: {new Date(comment.created_at).toString().slice(0, 24)}</p>
      <p>Votes: {commentVote}</p>
      {comment.author === user.username ? (
        <section className='removeSection'>
          <DeleteComment
            commentId={comment.comment_id}
            setErrorMessage={setErrorMessage}
            setDeleteSuccessful={setDeleteSuccessful}
          />
          {errorMessage ? (
            <p className='error deleteError'>{errorMessage}</p>
          ) : (
            ''
          )}
        </section>
      ) : (
        <section className='commentVoteSection'>
        <CommentVoteButton comment_id={comment.comment_id} setCommentVote={setCommentVote} setButtonMessage={setButtonMessage}/>
        <p className={buttonMessage.class}>{buttonMessage.msg}</p>
        </section>
      )}</>}
    </li>
  )
}
