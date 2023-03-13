import { useEffect, useState } from 'react'
import { getComments } from '../../utils/api'
import { CommentCard } from './CommentCard'

export const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    getComments(review_id).then(comments => {
      setComments(comments)
      console.log(comments)
      setIsLoading(false)
    })
  }, [])
  return (
    isLoading? <p>Loading...</p> :
      <ol className='commentsSection'>
        <h3>Comments</h3>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} comment={comment} />
        })}
      </ol>

  )
}