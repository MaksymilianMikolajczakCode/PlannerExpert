import { FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Project'
import ProjectInfo from './ProjectInfo'
import {GrTask} from 'react-icons/gr'
const Project = ({
  _id,
  createdAt,
  projectTitle,
  description,
  task
}) => {
  const { deleteProject } = useAppContext()
  let count = task.length
  const date = createdAt.slice(0,10)
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{projectTitle.charAt(0)}</div>
        <div className='info'>
          <h5>{projectTitle}</h5>
          <p>{description.length < 60 ? description : `${description.substring(0,57)}...`}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ProjectInfo icon={<GrTask />} text={`${count} tasks`}/>
          <ProjectInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer>
          <div className='actions'>
            <Link
              to={`/project/${_id}`}
              className='btn edit-btn'
            >
              Go To
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProject(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Project