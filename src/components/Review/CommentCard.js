export const CommentCard = ({ comment }) => {
  return (
    <li className='commentCard'>
      <p>Author: {comment.author}</p>
      <p className='commentText'>Comment: {comment.body}</p>
      <p>Date: {new Date(comment.created_at).toString().slice(0,24)}</p>
      <p>Votes: {comment.votes}</p>
    </li>
  )
}
