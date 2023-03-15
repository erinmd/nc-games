import { useState } from 'react'
import { deleteComment } from '../../../utils/api'

export const DeleteComment = ({ commentId, setComments }) => {
  const [buttonText, setButtonText] = useState('Remove Comment')
  const removeCommentHandler = () => {
    setButtonText('Removing...')
    deleteComment(commentId).then(() => {
      setComments(currComments => {
        return currComments.filter(comment => {
          return comment.comment_id !== commentId
        })
      })
    })
  }
  return <button className='removeButton' disabled={buttonText === 'Removing...'} onClick={removeCommentHandler}>{buttonText}</button>
}
