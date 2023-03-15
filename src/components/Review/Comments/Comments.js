import { useEffect, useState } from 'react'
import { getComments } from '../../../utils/api'
import { AddComment } from './AddComment'
import { CommentCard } from './CommentCard'

export const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getComments(review_id).then(comments => {
      setComments(comments)
      setIsLoading(false)
    })
  }, [review_id])

  
  return (
    <section className='commentsSection'>
      <h3>Comments</h3>
      {message ? <p className={message.class}>{message.msg}</p> : ''}
      <AddComment setMessage={setMessage} setComments={setComments} review_id={review_id}/>
      {isLoading ? (
        <p>Loading...</p>
      ) : comments.length > 0 ? (
        <ol className='commentList'> {comments.map(comment => {
          return <CommentCard key={comment.comment_id} comment={comment} setComments={setComments}/>
        })}
      </ol>) : (
        <p>No comments</p>
      )}
    </section>
  )
}
