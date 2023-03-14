import { useEffect, useState } from 'react'
import { getComments } from '../../utils/api'
import { AddComment } from './AddComment'
import { CommentCard } from './CommentCard'

export const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      <AddComment setComments={setComments} review_id={review_id}/>
      {isLoading ? (
        <p>Loading...</p>
      ) : comments.length > 0 ? (
        comments.map(comment => {
          return <ol className='commentList'><CommentCard key={comment.comment_id} comment={comment} /></ol>
        })
      ) : (
        <p>No comments</p>
      )}
    </section>
  )
}
