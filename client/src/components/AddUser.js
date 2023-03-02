import React,  { useState } from 'react'
import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'
import { useParams } from 'react-router-dom'


const AddUser = () => {
    const [newUser, setNewUser] = useState()
    const { addUser, isLoading,displayAlert } = useAppContext()
    const {id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault()
    
        if (!newUser) {
          displayAlert('Please provide all values')
          return
        }
        addUser(id, newUser)
        console.log('add user')
    }
    return (
        <form className='form'>
        <div className='form-center'>
            {/* taskTitle */}
            <FormRow
                labelText={'invite user'}
                type='text'
                name='addUser'
                placeholder={'Username'}
                value={newUser}
                handleChange={(e) => setNewUser(e.target.value)}
            />
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Add user
            </button>
          </div>
        </div>
      </form>
    )
}


export default AddUser 
