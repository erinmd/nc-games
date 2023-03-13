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

export const getComments = review_id => {
    return gamesApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
      return data.comments
    })
  }
  