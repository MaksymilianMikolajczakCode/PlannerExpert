import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'

const NavLinks = ({ toggleSidebar }) => {
  const { getProjects, projects, isLoading2, isLoading} = useAppContext()
  useEffect(() => {
    getProjects()
  }, [])

  if (isLoading2) {
    return <Loading center />
  }
  return (
    <div className='nav-links'>
        {links.map((link) => {
        const { text, path, id, icon } = link

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
      {projects.map((project) => {
        return (
          <NavLink
            to={`project/${project._id}`}
            key={project._id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
        }
        >
            {project.projectTitle.length < 17 ? project.projectTitle : `${project.projectTitle.substring(0,14)}...`}
        </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks