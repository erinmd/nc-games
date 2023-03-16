import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteReview } from '../../utils/api'

export const RemoveReview = ({reviewId}) => {
  const [message, setMessage] = useState({msg:null, class:'none'})
  const navigate = useNavigate()
  const removeReview = () => {
    deleteReview(reviewId).then(() => {
        setMessage({msg:'Review Deleted! Please navigate back to the homepage', class:'success'})
    })
  }

  return !message.msg ? <button onClick={()=>setMessage({msg:'Are you sure? You can\'t get it back!', class:'error'})}>Remove review</button> : 
  message.class === 'error' ?
  <>
  <button disabled={message.class==='success'} onClick={removeReview}>Confirm</button>
  <p className={message.class}>{message.msg}</p>
  </> :
  <>
  <button onClick={()=> {navigate('/')}}>Back to home</button>
  <p className={message.class}>{message.msg}</p>
  </>
}
