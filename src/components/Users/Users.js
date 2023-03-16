import { useContext } from "react"
import { UserContext } from "../../contexts/User"

export const Users = () => {
    const {user} = useContext(UserContext)
    return <section>
        <h2>Users</h2>
        <ol>
            <li className='userCard'>
                <div className='userProfileText'>
                <h3>Current user</h3>
                <p>Username: {user.username}</p>
                <p>Name: {user.name}</p>
                </div>
                <img className='userProfileAvatar' src={user.avatar_url} alt={user.username}/>
            </li>
        </ol>
        </section>
}