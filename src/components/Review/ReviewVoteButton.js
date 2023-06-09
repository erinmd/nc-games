import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/User'
import { getUserVotes, updateReviewVote, upsertUserVotes } from '../../utils/api'

export const ReviewVoteButton = ({
  review_id,
  setReview,
  setButtonMessage
}) => {
  const [buttonClicked, setButtonClicked] = useState({up:true, down:true})
  const {user} = useContext(UserContext)

  useEffect(()=>{
    getUserVotes(user.username).then((userVotes) => {
      if (userVotes.likes.includes(+review_id)) {
        setButtonClicked({up:true, down:false})
      } else if (userVotes.dislikes.includes(+review_id)) {
        setButtonClicked({up:false, down: true})
      } else {
        setButtonClicked({up:false, down:false})
      }
    })
  },[review_id, user.username])

  const voteHandler = (inc) => {
    
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
      if (inc === 1 && buttonClicked.up || inc === -1 && buttonClicked.down) inc *= -1
    }

    setReview(currReview => {
      return { ...currReview, votes: currReview.votes + inc }
    })
    
    
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

    upsertUserVotes(user.username, review_id, inc)
  }

  return (
    <>
      <button
        className={`reviewVoteButton ${buttonClicked.up}`}
        onClick={()=>voteHandler(1)}
      >
        👍
      </button>
      <button
        className={`reviewVoteButton ${buttonClicked.down}`}
        onClick={()=>voteHandler(-1)}
      >
        👎
      </button>
    </>
  )
}
