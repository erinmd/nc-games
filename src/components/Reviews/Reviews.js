import { useEffect, useState } from 'react'
import { getCategories, getReviews } from '../../utils/api'
import { ReviewCard } from './ReviewCard'
import { formatCategoryName } from '../../utils/utils'
import { ErrorPage } from '../ErrorPage'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CircularProgress} from '@mui/material'


export const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalReviews, setTotalReviews] = useState(null)
  const [currentCat, setCurrentCat] = useState({
    desc: 'Loading...',
    name: 'Loading'
  })
  const [serverMsg, setServerMsg] = useState('')
  const [noReviewsMsg, setNoReviewsMsg] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(()=>{if(!totalReviews) setServerMsg('Server is warming up... This could take up to 30 seconds (using free api host)')}, 2000)
    setPage(1)
    setHasMore(true)
    setErrorMessage(null)
    setIsLoading(true)
    setNoReviewsMsg(null)
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
        setServerMsg('')
        if (returnedReviews.length === 0) setNoReviewsMsg('No reviews found.')
        if (returnedReviews.length > totalReviews - 10) {
          setHasMore(false)
        }
      })
      .catch(err => {
        setIsLoading(false)
        setServerMsg('')
        if (err.response) {
          setErrorMessage(
            `${err.response.data.msg}. Please use the navigation bar!`
          )
        }
      })
  }, [searchParams, totalReviews])

  useEffect(() => {
    if (hasMore && page > 1) {
      setServerMsg('')
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
          if (err.response) {
            setErrorMessage(
              `${err.response.data.msg}. Please use the navigation bar!`
            )
          }
        })
    }
  }, [page, hasMore, searchParams, totalReviews])

  useEffect(() => {
    if (searchParams.get('category')) {
      getCategories().then(categories => {
        const currentCategory = categories.find(category => {
          return category.slug === searchParams.get('category')
        })
        if (currentCategory) {
          setCurrentCat({
            desc: currentCategory.description,
            name: formatCategoryName(searchParams.get('category'))
          })
        } else {
          setErrorMessage(
            "Category doesn't exist, please use the navigation bar!"
          )
        }
      })
    }
  }, [searchParams])

  useEffect(() => {
    function handleScroll () {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop + clientHeight + 100 >= scrollHeight && hasMore) {
        setPage(page + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)

  }, [reviews, page, hasMore])

  return errorMessage ? (
    <ErrorPage error={errorMessage} />
  ) : (
    <section className='reviewsContainer'>
      {searchParams.get('category') ? (
        <h2 className='catHeader'>Category: {currentCat.name}</h2>
      ) : (
        <h2 className='catHeader'>All Games</h2>
      )}
      {searchParams.get('category') ? (
        <p className='catDescription'> Description: {currentCat.desc}</p>
      ) : (
        <p className='catDescription'> Description: All available games</p>
      )}
       <button className='navNewReview' onClick={()=>navigate('/add-review')}>Add another review</button>
      {isLoading && page === 1 ? (
      <div className='initialPageLoad'>
        <CircularProgress />
        <p className='initialPageLoad'>{serverMsg}</p>
        </div>
        
      ) : (
        <p className='blank'></p>
      )}
     
      <ol className='reviewsSection'>
        {reviews.map(review => {
          return <ReviewCard key={review.review_id} review={review} />
        })}
      </ol>

      {isLoading && page > 1 ? (
        <div className='initialPageLoad'><CircularProgress /></div>
      ) : noReviewsMsg ? (
        <p className='initialPageLoad'>{noReviewsMsg}</p>
      ) : !hasMore ? (
        <p className='initialPageLoad'>End of reviews</p>
      ) : (
        ''
      )}
    </section>
  )
}
