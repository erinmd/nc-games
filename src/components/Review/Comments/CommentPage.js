import { useEffect, useState } from 'react'
import { getReview } from '../../../utils/api'
import { AddComment } from './AddComment'
import { Comments } from './Comments'
import { Pagination } from '@mui/material'

export const CommentPage = ({ review_id}) => {
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState(1)
  const [pageNumbers, setPageNumbers] = useState(0)

  useEffect(() => {
    getReview(review_id).then(review => {
    setPageNumbers(Math.ceil(review.comment_count/5))
    }).catch(err=>console.log(err))
    
    
  }, [review_id, comments])

  return (
    <section className='commentsSection'>
      <h3>Comments</h3>
      {message ? <p className={message.class}>{message.msg}</p> : ''}
      <AddComment
        setMessage={setMessage}
        setComments={setComments}
        review_id={review_id}
        setPage={setPage}
      />

      <Comments
        review_id={review_id}
        setMessage={setMessage}
        page={page}
        comments={comments}
        setComments={setComments}
      />

      <Pagination variant='outlined' count={pageNumbers} onChange={(e,value) => setPage(value)} page={page} />
    </section>
  )
}
