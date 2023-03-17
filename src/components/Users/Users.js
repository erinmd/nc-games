import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/User'
import { getUsers } from '../../utils/api'
import { UserCard } from './UserCard'

export const Users = () => {
  const { user} = useContext(UserContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(users => {
      setUsers(
        users.filter(singleUser => {
          return singleUser.username !== user.username
        })
      )
    })
  }, [user.username])

 

  const userCards = users.map(singleUser => {
    return <UserCard key={singleUser.username} user={singleUser} />
  })

  return (
    <section className='userPage'>
      <h2>Users</h2>
      <p> Select the user you wish to use</p>
      <ol className='userList'>
        <li key={user.username} className='userCard selectedUser'>
          <div className='userProfileText'>
            <h3>Current user</h3>
            <p>Username: {user.username}</p>
            <p>Name: {user.name}</p>
            <Link to={`/users/${user.username}`} ><button>Profile</button></Link>
          </div>
          <img
            className='userProfileAvatar'
            src={user.avatar_url}
            alt={user.username}
          />
        </li>
        {userCards}
      </ol>
    </section>
  )
}
