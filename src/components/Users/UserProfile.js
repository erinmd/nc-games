import { useContext } from 'react'
import { useParams } from 'react-router'
import { UserContext } from '../../contexts/User'
import { CategoryChart } from './CategoryChart'

export const UserProfile = () => {
  let { username } = useParams()
  const { user } = useContext(UserContext)

  return user.username !== username ? (
    <p>
      You are not logged in as {username}. You must log in as this user to view
      this page!
    </p>
  ) : (
    <section className='profilePage'>
      <h3 className='profileHeader'>User Profile</h3>
      <section className='profilePageContainer'>
        <section className='mainUserInfo'>
          <div className='userProfilePageText'>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Name:</strong> {user.name}</p>
          </div>
          <img
            className='userProfilePageAvatar'
            src={user.avatar_url}
            alt={user.username}
          />
        </section>
        <section className = 'chartContainer'>
            <h2 className='chartHeader'>Which games do you like best?</h2>
            <CategoryChart />
        </section>
      </section>
    </section>
  )
}
