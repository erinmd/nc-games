import axios from 'axios'

const gamesApi = axios.create({
  baseURL: 'https://nc-games-project-2obg.onrender.com/api'
})

export const getReviews = (category, sort_by, order_by, p) => {
  return gamesApi
    .get('/reviews', { params: { category, sort_by, order_by, p } })
    .then(({ data }) => {
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
  return gamesApi.get('/categories').then(({ data }) => {
    return data.categories
  })
}

export const getUsers = () => {
  return gamesApi.get('/users').then(({ data }) => {
    return data.users
  })
}

export const deleteComment = commentId => {
  return gamesApi.delete(`/comments/${commentId}`)
}

export const postReview = review => {
  return gamesApi
    .post('/reviews', {
      owner: review.owner,
      title: review.title,
      designer: review.designer,
      category: review.category,
      review_img_url: review.image,
      review_body: review.body
    })
    .then(({ data }) => {
      return data.review
    })
}

export const deleteReview = reviewId => {
  return gamesApi.delete(`/reviews/${reviewId}`)
}