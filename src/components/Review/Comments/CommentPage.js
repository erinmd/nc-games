import { useState } from 'react'
import { AddComment } from './AddComment'
import { Comments } from './Comments'

export const CommentPage = ({ review_id, comment_count }) => {
  const [comments, setComments] = useState([])
  
  const [message, setMessage] = useState(null)
  const [page, setPage] = useState(1)

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(comment_count / 5); i++) {
    pageNumbers.push(i)
  }

  const pageListItems = pageNumbers.map(currentPage => {
    let pageClass = 'pageNumber'
    if (page === currentPage) pageClass = ' currentPage'
    return (
      <li
        className={pageClass}
        onClick={() => setPage(currentPage)}
        key={currentPage}
      >
        {currentPage}
      </li>
    )
  })

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
          comments = {comments}
          setComments = {setComments}
        />
 
      <ol className='commentPageList'>{pageListItems}</ol>
    </section>
  )
}
