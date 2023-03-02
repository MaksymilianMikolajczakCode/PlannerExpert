import React, {useEffect} from 'react'
import FormRow  from '../../components/FormRow'
import Alert from '../../components/Alert'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import Loading from '../../components/Loading'
const AddProject = () => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    projectTitle,
    description,
    handleChange,
    createProject,
  } = useAppContext()
  useEffect(() => {
    handleChange({ name: 'projectTitle', value: ''})
    handleChange({ name: 'description', value: ''})
    document.getElementById("description").value = ""
  },[])
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!projectTitle || !description ) {
      displayAlert('Please provide all values')
      return
    }
    createProject()
    handleChange({ name: 'projectTitle', value: ''})
    handleChange({ name: 'description', value: ''})
    document.getElementById("description").value = ""
  }
  const handleChangeDesc = (e) => {
    handleChange({ name: e.target.name, value: document.getElementById("description").value })
  }
  const handleProjectInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }
  if (isLoading) {
    return <Loading center />
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>New Project</h3>
        {showAlert && <Alert />}

        {/* projectTitle */}
        <div className='two'>
          <FormRow
            type='text'
            maxLength={50}
            name='projectTitle'
            value={projectTitle}
            placeholder='Project Title'
            handleChange={handleProjectInput}
          />
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
        <div className='one'>
          {/* description */}
          <textarea className='form-textarea' style={{ height: 'auto', resize: 'none'}}
            id='description'
            rows='2'
            maxLength="250"
            name='description'
            placeholder='Description'
            onChange={handleChangeDesc}>

          </textarea>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddProject