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

export const getComments = (reviewId, p) => {
  return gamesApi.get(`/reviews/${reviewId}/comments`, {params: {p, limit:5}}).then(({ data }) => {
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

export const updateCommentVote = (commentId, inc_votes) => {
  return gamesApi.patch(`/comments/${commentId}`, { inc_votes })
}

export const getUserVotes = (username) => {
  return gamesApi.get(`/users/${username}/votes`).then(({data}) => {
    return data.userVotes
  })
}

export const upsertUserVotes = (username, review_id, vote) => {
  return gamesApi.post(`/users/${username}/votes`, {review_id, vote}).then(({data})=> {
    return data.uservote
  })
}

export const getUserVoteCategories = (username)=> {
  return gamesApi.get(`users/${username}/votes/categories`).then(({data})=> {
    return data.userVoteCategories
  })
}