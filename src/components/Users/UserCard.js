import { useContext } from "react"
import { UserContext } from "../../contexts/User"

export const UserCard = ({user}) => {
    const { setUser } = useContext(UserContext)

    const selectUser = () => {
        setUser(user)
      }

  return (
    <li onClick={selectUser} className='userCard'>
      <div className='userProfileText'>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
      </div>
      <img
        className='userProfileAvatar'
        src={user.avatar_url}
        alt={user.username}
      />
    </li>
  )
}
