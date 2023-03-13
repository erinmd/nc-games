import { useEffect, useState } from "react"
import { getReviews } from "../../utils/api"
import { ReviewCard } from "./ReviewCard"

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getReviews().then((reviews)=>{
            setReviews(reviews)
            setIsLoading(false)
        })
    },[]
    )
  return (isLoading === false ? 
    <ol className='reviewsSection'> 
        {reviews.map(review => {
            return <ReviewCard key={review.review_id} review={review}/>
        })}
    </ol> : <p>Loading...</p>)

}
