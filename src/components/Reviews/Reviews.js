import { useEffect, useState } from 'react'
import { getCategories, getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { useParams } from 'react-router-dom'
import { formatCategoryName } from '../../utils/utils'

export const Reviews = ({ searchParams }) => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { category_name } = useParams()
  const [catDescription, setCatDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalReviews, setTotalReviews] = useState(null)

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    setErrorMessage(null)
    setIsLoading(true)
    getReviews(
      searchParams.get('category'),
      searchParams.get('sort_by'),
      searchParams.get('order'),
      1
    )
      .then(returnedReviews => {
        setTotalReviews(returnedReviews[0].total_count)
        setReviews(returnedReviews)
        setIsLoading(false)
        if (returnedReviews.length > totalReviews - 10) {
          setHasMore(false)
        }
      })
      .catch(err => {
        setIsLoading(false)
        setErrorMessage(err.response.data.msg)
      })
  }, [category_name, searchParams, totalReviews])

  useEffect(() => {
    if (hasMore && page > 1) {
      setIsLoading(true)
      getReviews(
        searchParams.get('category'),
        searchParams.get('sort_by'),
        searchParams.get('order'),
        page
      )
        .then(returnedReviews => {
          setReviews(currReviews => {
            const newReviews = [...currReviews, ...returnedReviews]
            setIsLoading(false)
            if (newReviews.length >= totalReviews) {
          
              setHasMore(false)
            }
            return newReviews
          })
        })
        .catch(err => {
          setIsLoading(false)
          console.log(err)
          setErrorMessage(err.response.data.msg)
        })
    }
  }, [page, hasMore, searchParams, totalReviews])

  useEffect(() => {
    if (category_name) {
      getCategories().then(categories => {
        const newDescription = categories.find(category => {
          return category.slug === category_name
        }).description
        setCatDescription(newDescription)
      })
    }
  }, [category_name])

  useEffect(() => {
    function handleScroll () {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop + clientHeight >= scrollHeight && hasMore) {
        setPage(page + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [reviews, page, hasMore])

  return (
    <section className='reviewsContainer'>
      {errorMessage ? (
        <p className='error'>{`${errorMessage}. Please use the drop down boxes!`}</p>
      ) : (
        ''
      )}
      {searchParams.get('category') ? (
        <h2 className='catHeader'>
          Category: {formatCategoryName(searchParams.get('category'))}
        </h2>
      ) : (
        <h2 className='catHeader'>All Games</h2>
      )}
      {category_name ? (
        <p className='catDescription'> Description: {catDescription}</p>
      ) : (
        ''
      )}
      <ol className='reviewsSection'>
        {reviews.map(review => {
          return <ReviewCard key={review.review_id} review={review} />
        })}
      </ol>
      {isLoading ? (
        <p className='initialPageLoad'>Loading...</p>
      ) : reviews.length === 0 ? (
        <p className='initialPageLoad'>No reviews found</p>
      ) : !hasMore ? (
        <p className='initialPageLoad'>End of reviews</p>
      ) : (
        ''
      )}
    </section>
  )
}
