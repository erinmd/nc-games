import { useState } from 'react'
import { updateReviewVote } from '../../utils/api'

export const ReviewVoteButton = ({
  review_id,
  setReview,
  setButtonMessage
}) => {
  const [buttonClicked, setButtonClicked] = useState({up:false, down:false})


  const voteHandler = (inc) => {
    setReview(currReview => {
      return { ...currReview, votes: currReview.votes + inc }
    })
    if (!buttonClicked.up && !buttonClicked.down){
      if (inc===1) {
        setButtonClicked({up:true, down:false})
        setButtonMessage({msg: 'Thanks for voting!', class:'success'})
      } else {
        setButtonClicked({up:false, down:true})
        setButtonMessage({msg: 'Thanks for voting!', class:'success'})
      }
    } else {
      setButtonClicked({up:false, down:false})
      setButtonMessage({msg: 'Your vote has been reset!', class:'success'})
    }
    
    
    updateReviewVote(review_id, inc).catch(err => {
      setReview(currReview => {
        return { ...currReview, votes: currReview.votes - inc }
      })
      if (!buttonClicked.up && !buttonClicked.down){
        if (inc===1) {
          setButtonClicked({up:true, down:false})
        } else {
          setButtonClicked({up:false, down:true})
        }
      } else {
        setButtonClicked({up:false, down:false})
      }
      setButtonMessage({msg: 'Something went wrong, please try again', class:'error'})
    })
  }

  return (
    <>
      <button
        disabled={buttonClicked.up}
        className='reviewVoteButton'
        onClick={()=>voteHandler(1)}
      >
        👍
      </button>
      <button
        disabled={buttonClicked.down}
        className='reviewVoteButton'
        onClick={()=>voteHandler(-1)}
      >
        👎
      </button>
    </>
  )
}
