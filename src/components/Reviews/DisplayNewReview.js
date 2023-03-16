export const DisplayNewReview = review => {
  return (
    <li className='reviewCard'>
      <h3>{review.title}</h3>
      <p>Designer: {review.designer}</p>
      <img
        className='reviewImage'
        src={review.review_img_url}
        alt={review.title}
      />
      <p>Category: {review.category}</p>
      <p>Owner: {review.owner}</p>
      <p>Created at: {new Date(review.created_at).toDateString()}</p>
      <p>
        Votes: {review.votes} Comments: {review.comment_count}
      </p>
    </li>
  )
}
