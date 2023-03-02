import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Project from './Project'
import Wrapper from '../assets/wrappers/ProjectContainer'

const ProjectsContainer = () => {
  const {
    getProjects,
    projects,
    isLoading2,
    totalProjects,
  } = useAppContext()
  useEffect(() => {
    getProjects()
    //eslint-disable-next-line
  }, [])
  if (isLoading2) {
    return <Loading center />
  }

  return (
    <Wrapper>
      <h5>
        {totalProjects} projects{projects.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {projects.map((project) => {
          return <Project key={project._id} {...project} />
        })}
      </div>
    </Wrapper>
  )
}

export default ProjectsContainer