import React,  { useEffect, useState } from 'react'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useAppContext } from '../context/appContext'
import { useParams} from 'react-router-dom'
import Loading from './Loading'
import FormRowStatusSelect from './FormRowStatusSelect'

const TaskForm = (props) => {
  const {id} = useParams();
  const task = props.task
  const owner = props.owner
  const list = owner.map((item) => {return (item.username)})
  const displayDate = task.date.slice(0,10)
  useEffect(() => {
    setTaskTitleData(task.taskTitle)
    setTaskStatusData(task.status)
    setTaskPersonData(task.person)
    setTaskDateData(displayDate)
  },[id])
  const [taskTitleData, setTaskTitleData] = useState(task.taskTitle)
  const [taskStatusData, setTaskStatusData] = useState(task.status)
  const [taskPersonData, setTaskPersonData] = useState(task.person)
  const [taskDateData, setTaskDateData] = useState(displayDate)
  const {isLoading, editTask, displayAlert, status} = useAppContext();
  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   if (!taskTitleData) {
  //     displayAlert()
  //     return
  //   }
    
  //   editTask(id, [task._id,{taskTitle: taskTitleData, status:taskStatusData,person: taskPersonData,date: taskDateData}])
  // }

  const handleOnBlurTitle = (e) => {
    e.preventDefault()
    if (props.task.taskTitle === taskTitleData) return 
    if (!taskTitleData) displayAlert('Please provide all values')
    else editTask(id, [task._id,{taskTitle: taskTitleData, status:taskStatusData,person: taskPersonData,date: taskDateData}])
  }
  const handleOnBlurStatus = (e) => {
    e.preventDefault()
    if (props.task.status === taskStatusData) return 
    if (!taskTitleData) displayAlert('Please provide all values')
    else editTask(id, [task._id,{taskTitle: taskTitleData, status:taskStatusData,person: taskPersonData,date: taskDateData}])
  }
  const handleOnBlurPerson = (e) => {
    e.preventDefault()
    if (props.task.person === taskPersonData) return 
    if (!taskTitleData) displayAlert('Please provide all values')
    else editTask(id, [task._id,{taskTitle: taskTitleData, status:taskStatusData,person: taskPersonData,date: taskDateData}])
  }
  const handleOnBlurDate = (e) => {
    e.preventDefault()
    if (displayDate === taskDateData) return
    if (!taskTitleData) displayAlert('Please provide all values')
    else editTask(id, [task._id,{taskTitle: taskTitleData, status:taskStatusData,person: taskPersonData,date: taskDateData}])
  }
  if (isLoading) {
    return <Loading center />
  }
  return (
    <form className='form'>
        {/* taskTitle */}
        <div className='form-center spacing'>
          <div>
          <label className='singleLabel'>Task Name</label>
          <FormRow
            type='text'
            maxLength={50}
            name='taskTitle'
            value={taskTitleData}
            onBlur={handleOnBlurTitle}
            handleChange={(e) => setTaskTitleData(e.target.value)}
          />
          </div>
          <div  className='status'>
            {/* status */}
            <label className='singleLabel'>Status</label>
            <FormRowStatusSelect
              name='status'
              value={taskStatusData}
              onBlur={handleOnBlurStatus}
              handleChange={(e) => setTaskStatusData(e.target.value)}
              list={status}
            />
          </div>
          <div>
          {/* person */}
          <label className='singleLabel'>Person</label>
          <FormRowSelect
            name='person'
            value={taskPersonData}
            onBlur={handleOnBlurPerson}
            handleChange={(e) => setTaskPersonData(e.target.value)}
            list={list}
          />
          </div>
          <div>
          {/* date */}
          <label className='singleLabel'>Date</label>
          <FormRow
            type='date'
            name='date'
            value={taskDateData}
            onBlur={handleOnBlurDate}
            handleChange={(e) => setTaskDateData(e.target.value)}
          />
        </div>
        </div>
      </form>
  )
}

export default TaskForm