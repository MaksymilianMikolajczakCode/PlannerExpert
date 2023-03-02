import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import FormRow from '../components/FormRow'
import Alert from '../components/Alert'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'
import Logo from '../components/Logo'

const initialState = {
  username: '',
  email: '',
  password: '',
  isMember: true,
}

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)

  const {user, isLoading, showAlert, displayAlert,registerUser, loginUser} = useAppContext()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  const toggleMember = () => {
    setValues({...values, isMember:!values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {username, password, email, isMember} = values
    if(!email || !password || (!isMember && !username)){
      displayAlert('Please provide all values')
      return
    }
    if(password.length <6){
      displayAlert('Password must be at least 6 characters long!')
      return
    }
    const currentUser = {username, email, password}
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert/>}
        {/* username input */}
        
        {!values.isMember && 
          <FormRow
        type='username'
        name='username'
        labelText='Username'
        value={values.username}
        handleChange={handleChange}
          />}

        {/* email input */}
        <FormRow
          type='email'
          name='email'
          labelText='Email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type='password'
          name='password'
          labelText='Password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block'  disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register