export const CommentCard = ({ comment }) => {
  return (
    <li className='commentCard'>
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>{new Date(comment.created_at).toDateString()}</p>
      <p>{comment.votes}</p>
    </li>
  )
}
