import { useState } from 'react'
import  Alert  from '../../components/Alert'
import FormRow  from '../../components/FormRow'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext()
  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !email ) {
      displayAlert('Please provide all values')
      return
    }

    updateUser({ username, email })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form profile'>
          <FormRow
            type='text'
            name='name'
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile