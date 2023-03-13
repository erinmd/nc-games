import {useNavigate} from 'react-router-dom'

export const ReviewCard = ({review}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/reviews/${review.review_id}`)
    }
    return <li onClick={handleClick} className='reviewCard'>
        <h3>{review.title}</h3>
        <p>Designer: {review.designer}</p>
        <img className='reviewImage' src={review.review_img_url} alt={review.title}/>
        <p>Category: {review.category}</p>
        <p>Owner: {review.owner}</p>
        <p>Created at: {new Date(review.created_at).toDateString()}</p>
        <p>Votes: {review.votes} Comments: {review.comment_count}</p>
        </li>
}