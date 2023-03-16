export const UserCard = ({user}) => {
  return (
    <li className='userCard'>
      <div className='userProfileText'>
        <h3>Current user</h3>
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
