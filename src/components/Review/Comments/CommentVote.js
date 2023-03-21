import { useState } from 'react'
import { updateCommentVote } from '../../../utils/api'

export const CommentVoteButton = ({
  comment_id,
  setCommentVote,
  setButtonMessage
}) => {
  const [buttonClicked, setButtonClicked] = useState({up:false, down:false})


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

    setCommentVote(currVote => {
      return currVote + inc
    })
    
    
    updateCommentVote(comment_id, inc).catch(err => {
        setCommentVote(currVote => {
            return currVote - inc
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

        className={`reviewVoteButton commentVoteButton ${buttonClicked.up}`}
        onClick={()=>voteHandler(1)}
      >
        ⬆
      </button>
      <button

        className={`reviewVoteButton commentVoteButton ${buttonClicked.down}`}
        onClick={()=>voteHandler(-1)}
      >
       ⬇
      </button>
    </>
  )
}
