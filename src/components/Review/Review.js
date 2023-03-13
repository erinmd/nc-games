import { useState } from "react"

export const Review = () => {
    const {review_id} = useParams();
    const [review, setReview] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        getReview(review_id).then(review => {
            setReview(review)
        })
    }, [])
    return <section className='singleReview'>
        <h2>Review</h2>
    </section>
}