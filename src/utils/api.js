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

export const updateReviewVote = (reviewId, inc_votes) => {
  return gamesApi
    .patch(`/reviews/${reviewId}`, { inc_votes })
    .then(({ data }) => {
      return data.review
    })
}

export const getComments = reviewId => {
  return gamesApi.get(`/reviews/${reviewId}/comments`).then(({ data }) => {
    return data.comments
  })
}

export const postComment = (reviewId, username, body) => {
  return gamesApi
    .post(`/reviews/${reviewId}/comments`, { username, body })
    .then(({ data }) => {
      return data.comment
    })
  }
  
export const getCategories = () => {
    return gamesApi.get('/categories').then(({data}) => {
        return data.categories
    })
}
