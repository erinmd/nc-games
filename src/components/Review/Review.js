import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { getReview } from "../../utils/api"
import { Comments } from "./Comments"

export const Review = () => {
    const {review_id} = useParams()
    const [review, setReview] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        setIsLoading(true)
        getReview(review_id).then(review => {
            setReview(review)
            setIsLoading(false)
        })
    }, [])
    return isLoading ? (<section className='singleReview'><p>Loading...</p></section>) : 
        (<section className='singleReview'><h2>{review.title}</h2>
        <p>Designer: {review.designer}</p>
        <img className='reviewImage' src={review.review_img_url} alt={review.title}/>
        <p className='reviewBody'>Review: {review.review_body}</p>
        <p>Category: {review.category}</p>
        <p>Owner: {review.owner}</p>
        <p>Created at: {new Date(review.created_at).toDateString()}</p>
        <p>Votes: {review.votes} Comments: {review.comment_count}</p>
        <Comments review_id={review_id}/>
        </section>)
    
}