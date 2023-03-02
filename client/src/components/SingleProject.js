import React, {useState} from 'react'
import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import Alert from './Alert'
import TaskForm from './TaskForm'
import AddUser from './AddUser'
import Loading from './Loading'
import { NavLink } from 'react-router-dom'

const SingleProject = () => {
  const {id} = useParams();
  const { isLoading3, project, createTask, taskTitle, getProject, projectId, showAlert, handleChange, displayAlert, isLoading, editProject,projectTitle,description, deleteProject} = useAppContext()
  useEffect(() => {
    getProject(id)
  },[projectId,id])
  const handleProjectInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }
  const handleChangeDesc = (e) => {
    handleChange({ name: e.target.name, value: document.getElementById("description").value })
  }

  const handleSubmitProject = (e) => {
    e.preventDefault()

    if (!projectTitle || !description ) {
      displayAlert('Please provide all values')
      return
    }
    if (projectTitle === project.projectTitle) return 
    editProject(id)
    getProject(id)
  }
  const handleSubmitDescription = (e) => {
    e.preventDefault()

    if (!projectTitle || !description ) {
      displayAlert('Please provide all values')
      return
    }
    if (description === project.description) return 
    editProject(id)
    getProject(id)
  }
  const handleSubmit2 = (e) => {
    e.preventDefault()

    if (!taskTitle) {
      displayAlert('Please provide all values')
      return
    }
    
    createTask(id)
  }
  if (isLoading) {
    return <Loading center />
  }
  return (
    <Wrapper>
      <div className='full'>
      <form className='form'>
        {showAlert && <Alert />}

        {/* projectTitle */}
        <div className='two bigger'>
          <FormRow
            maxLength={50}
            type='text'
            name='projectTitle'
            onBlur={handleSubmitProject}
            value={projectTitle}
            handleChange={handleProjectInput}
          />
        </div>
          <div className='one bottomLine spacing'>
          {/* description */}
          <textarea className='form-textarea' style={{ height: 'auto', resize: 'none'}}
            id='description'
            rows='2'
            name='description'
            maxLength='250'
            onBlur={handleSubmitDescription}
            onChange={handleChangeDesc}>
              {description}
          </textarea>
        </div>
      </form>
      <div className='labelText'>
        <span>Task Name</span><span>Status</span><span>Person</span><span>Date</span>
      </div>
      {project.task && project.task.map((task) => {
        return (          
        <TaskForm key={task._id} task={task} owner={project.owner}/>)
      })}
        <form className='form'>
          {/* add task */}
      <div className='form-center'>
          <FormRow
            type='text'
            name='taskTitle'
            maxLength={50}
            labelText='Add Task'
            value={taskTitle}
            placeholder='Task Name'
            handleChange={handleProjectInput}
          />
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit2}
              disabled={isLoading3}
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
      <AddUser/>
      <NavLink
            to={'/'}
            onClick={() => deleteProject(id)}
            className='btn delete-btn'
            style={{margin: '0.75rem 0'}}
          >
            Delete Project
        </NavLink>
        </div>
    </Wrapper>
  )
}

export default SingleProject