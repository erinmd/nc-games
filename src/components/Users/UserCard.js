export const UserCard = ({user}) => {
  return (
    <li className='userCard'>
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
