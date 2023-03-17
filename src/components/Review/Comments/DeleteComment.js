import { useState } from 'react'
import { deleteComment } from '../../../utils/api'

export const DeleteComment = ({ commentId, setErrorMessage,setDeleteSuccessful, setMessage }) => {
  const [buttonText, setButtonText] = useState('Remove Comment')
  const removeCommentHandler = () => {
    setButtonText('Removing...')
    deleteComment(commentId).then(() => {
      setDeleteSuccessful(true)
      setMessage(null)
    }).catch(()=>{
        setErrorMessage('Something went wrong, try again!')
        setButtonText('Remove Comment')
    })
  }
  return <button className='removeButton' disabled={buttonText === 'Removing...'} onClick={removeCommentHandler}>{buttonText}</button>
}
