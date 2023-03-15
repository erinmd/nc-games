import { useEffect, useState } from 'react'
import { getCategories, getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { formatCategoryName } from '../../utils/utils'
import { ErrorPage } from '../ErrorPage'

export const Reviews = ({ searchParams }) => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [catDescription, setCatDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    setErrorMessage(null)
    setIsLoading(true)
    getReviews(searchParams.get('category'), searchParams.get('sort_by'), searchParams.get('order')).then(reviews => {
      setReviews(reviews)
      setIsLoading(false)
    }).catch(err=> {
      setIsLoading(false)
      setErrorMessage(`${err.response.data.msg}. Please use the navigation bar!`)})
  }, [searchParams])

  useEffect(() => {
    if (searchParams.get('category')) {
      getCategories().then(categories => {
        const currentCategory = categories.find(category => {
          return category.slug === searchParams.get('category')
        })
        if (currentCategory) {
        setCatDescription(currentCategory.description)
        } else {
          setErrorMessage('Category doesn\'t exist, please use the navigation bar!')
        }
      })
    }
  }, [searchParams])

  return ( errorMessage ? (
      <ErrorPage error={errorMessage} />
    ) :
    <section className='reviewsContainer'>
      {searchParams.get('category') ? (
        <h2 className='catHeader'>
          Category: {formatCategoryName(searchParams.get('category'))}
        </h2>
      ) : (
        <h2 className='catHeader'>All Games</h2>
      )}
      {searchParams.get('category') ? (
        <p className='catDescription'> Description: {catDescription}</p>
      ) : (
        ''
      )}
      {isLoading ? (
        <p className='initialPageLoad'>Loading...</p>
      ) : (
        <ol className='reviewsSection'>
          {reviews.length > 0 ? reviews.map(review => {
            return <ReviewCard key={review.review_id} review={review} />
          })
          : <p>No reviews found</p> }
        </ol>
      )}
    </section>
  )
}
