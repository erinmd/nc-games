import axios from 'axios'

const gamesApi = axios.create({
  baseURL: 'https://nc-games-project-2obg.onrender.com/api'
})

export const getReviews = () => {
  return gamesApi.get('/reviews').then(({ data }) => {
    return data.reviews
  })
}

export const getReview = reviewId => {
  return gamesApi.get(`/reviews/${reviewId}`).then(({ data }) => {
    return data.review
  })
}
