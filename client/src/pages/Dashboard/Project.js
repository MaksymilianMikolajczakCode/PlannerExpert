import React from 'react'
import SingleProject from '../../components/SingleProject'
const Project = () => {
  return (
    <SingleProject/>
  )
}

export default Project

// import React from 'react'
// import TopContainer from '../../components/TopContainer'
// import TaskForm from '../../components/TaskContainer'
// import { useAppContext } from '../../context/appContext'
// import { useParams} from 'react-router-dom'
// import { useEffect } from 'react'
// import Loading from '../../components/Loading'

// const Project = () => {
//   const {project, createTask, taskTitle, getProject, projectId, showAlert, handleChange, displayAlert, isLoading, editProject,projectTitle,description} = useAppContext()
//   const {id} = useParams();
//   useEffect(() => {
//     getProject(id)
//   },[projectId,id])
//   if (isLoading) {
//     return <Loading center />
//   }
//   return (
//     <div>
//       <TopContainer project={project}/>
//       <TaskForm project={project}/>
//     </div>
//   )
// }

// export default Project