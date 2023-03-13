import { useState } from 'react'
import { updateReviewVote } from '../../utils/api'

export const ReviewVoteButton = ({
  up,
  review_id,
  setReview,
  buttonClicked,
  setButtonClicked,
  setButtonMessage
}) => {
  const buttonText = up ? '👍' : '👎'
  const inc = up ? 1 : -1

  const voteHandler = () => {
    setReview(currReview => {
      return { ...currReview, votes: currReview.votes + inc }
    })
    setButtonClicked(true)
    setButtonMessage('Thanks for voting!')
    updateReviewVote(review_id, inc).catch(err => {
      setReview(currReview => {
        return { ...currReview, votes: currReview.votes - inc }
      })
      setButtonClicked(false)
      setButtonMessage('Something went wrong, please try again')
    })
  }

  return (
    <>
      <button
        disabled={buttonClicked}
        className='reviewVoteButton'
        onClick={voteHandler}
      >
        {buttonText}
      </button>
    </>
  )
}
