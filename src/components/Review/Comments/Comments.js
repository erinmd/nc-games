import { useEffect, useState } from 'react'
import { getComments } from '../../../utils/api'
import { CommentCard } from './CommentCard'

export const Comments = ({ review_id, page, setMessage, comments, setComments }) => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setMessage(null)
    getComments(review_id, page).then(comments => {
      setComments(comments)
      setIsLoading(false)
    })
  }, [review_id, page, setIsLoading, setMessage, setComments])

  return (
    isLoading ? <p>Loading...</p> : comments.length > 0 ?
    <ol className='commentList'>
      {comments.map(comment => {
        return (
          <CommentCard
            setMessage={setMessage}
            key={comment.comment_id}
            comment={comment}
            setComments={setComments}
          />
        )
      })}
    </ol> :<p>No comments</p>
  )
}
