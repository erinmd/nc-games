import { useContext } from "react"
import { UserContext } from "../../contexts/User"

export const DisplayNewReview = ({ review, setNewReview }) => {
  const {user} = useContext(UserContext)

  const addDefaultSrc = e => {
    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3813/3813719.png'
  }

  return (
    <ul >
        <p>Check your review before submitting</p>
    <li className='reviewCard'>
      <h3>{review.title}</h3>
      <p>Designer: {review.designer}</p>
      <img onError={addDefaultSrc} className='reviewImage' src={review.image} alt={review.title} />
      <p>Category: {review.category}</p>
      <p>Owner: {user.username}</p>
      <p>Created at: {new Date(Date.now()).toDateString()}</p>
      <p>
        Votes: 0 Comments: 0
      </p>
      <button onClick={()=>setNewReview(null)}>Reset</button>
    </li>
    </ul>
  )
}
