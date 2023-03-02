import React, {useReducer, useContext, useEffect } from 'react'
import axios from 'axios'
import reducer from './reducer'

import { DISPLAY_ALERT, 
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_BEGIN, 
  LOGIN_USER_SUCCESS, 
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  CLEAR_VALUES,
  GET_PROJECTS_BEGIN,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_BEGIN,
  GET_PROJECT_BEGIN_NO_LOADING,
  GET_PROJECT_SUCCESS,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_SUCCESS,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  CLEAR_FILTERS,
  } from "./actions"

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  isLoading2: false,
  isLoading3: false,
  showAlert: false,
  isEditing: false,
  inputName: 'Name',
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  projectTitle: '',
  description: '',
  taskTitle: '',
  status: ['Done', 'Working on', 'Stuck'],
  date: '',
  person: '',
  projects: [],
  projectId: '',
  project: [],
  totalProjects: 0,
  search: '',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)


  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )


    const displayAlert = (text) => {
        dispatch({type:DISPLAY_ALERT,
        payload: {text: text}})
        clearAlert()
    }

    const clearAlert = () => {
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT })
      }, 5000)
    }

    const addUserToLocalStorage = ({ user, token}) => {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    }
    
    const removeUserFromLocalStorage = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    const registerUser = async (currentUser) => {
      dispatch({type: REGISTER_USER_BEGIN})
      try {
        const {data} = await axios.post('/api/v1/auth/register', currentUser)
        const { user, token } = data
        console.log(data)
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: {
            user,
            token
          },
        })
        addUserToLocalStorage({user,token})
      }
      catch (error) {
        dispatch({
          type: REGISTER_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }

    const loginUser = async (currentUser) => {
      dispatch({ type: LOGIN_USER_BEGIN })
      try {
        const { data } = await axios.post('/api/v1/auth/login', currentUser)
        const { user, token} = data
    
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { user, token},
        })
    
        addUserToLocalStorage({ user, token })
      } catch (error) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }

    const logoutUser = () => {
      dispatch({ type: LOGOUT_USER })
      removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
      dispatch({ type: UPDATE_USER_BEGIN })
      try {
        const { data } = await authFetch.patch('/auth/updateUser', currentUser)
  
        const { user, token } = data
  
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { user, token },
        })
        addUserToLocalStorage({ user, token })
      } catch (error) {
        if (error.response.status !== 401) {
          dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          })
        }
      }
      clearAlert()
    }

    const toggleSidebar = () => {
      dispatch({ type: TOGGLE_SIDEBAR })
    }

    const handleChange = ({ name, value }) => {
      dispatch({
        type: HANDLE_CHANGE,
        payload: { name, value },
      })
    }

    const createProject = async () => {
      dispatch({ type: CREATE_PROJECT_BEGIN })
      try {
        const { projectTitle, description } = state
    
        await authFetch.post('/projects', {
          projectTitle,
          description,
          task: [{taskTitle: 'First Task'}, {taskTitle: 'Second Task'}]
        })
        dispatch({
          type: CREATE_PROJECT_SUCCESS,
        })
        getProjects()
        dispatch({ type: CLEAR_VALUES })
      } catch (error) {
        if (error.response.status === 401) return
        dispatch({
          type: CREATE_PROJECT_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }

    const getProjects = async () => {
      const { search, sort } = state
      // let url = `/projects`
      let url = `/projects?&sort=${sort}`
      if (search) {
        url = url + `&search=${search}`
      }
      dispatch({ type: GET_PROJECTS_BEGIN })
      try {
        const { data } = await authFetch(url)
        const { projects, totalProjects } = data
        dispatch({
          type: GET_PROJECTS_SUCCESS,
          payload: {
            projects,
            totalProjects,
          },
        })
      } catch (error) {
        console.log(error.response)
        logoutUser()
      }
      clearAlert()
    }
    const getProjectNoLoading = async (id) => {
      dispatch({ type: GET_PROJECT_BEGIN_NO_LOADING})
      try {
        const {data} = await authFetch(`/projects/${id}`)
        const {project} = data
        dispatch({
          type: GET_PROJECT_SUCCESS,
          payload: {project}
        })
      } catch (error) {
        console.log(error.response)
      }
    }
    const getProject = async (id) => {
      dispatch({ type: GET_PROJECT_BEGIN})

      try {
        const {data} = await authFetch(`/projects/${id}`)
        const {project} = data
        dispatch({
          type: GET_PROJECT_SUCCESS,
          payload: {project}
        })
      } catch (error) {
        console.log(error.response)
      }
    }

    const editProject = async (id) => {
      dispatch({ type: EDIT_PROJECT_BEGIN })
  
      try {
        const { projectTitle, description } = state
        await authFetch.patch(`/projects/${id}`, {
          projectTitle,
          description
        })
        dispatch({ type: EDIT_PROJECT_SUCCESS })
        getProjects()
      } catch (error) {
        if (error.response.status === 401) return
        dispatch({
          type: EDIT_PROJECT_ERROR,
          payload: { msg: error.response.data.msg },
        })
        
      }
      clearAlert()
    }

    const deleteProject = async (id) => {
      dispatch({ type: DELETE_PROJECT_BEGIN })
      try {
        await authFetch.delete(`/projects/${id}`)
        getProjects()
        dispatch({ type: DELETE_PROJECT_SUCCESS })
      } catch (error) {
        logoutUser()
      }
    }

    const createTask = async (id) => {
      dispatch({ type: CREATE_TASK_BEGIN })
      try {
        const { taskTitle,  user } = state
    
        await authFetch.post(`/projects/${id}`, {
          taskTitle,
          person: user.username,
        })
        dispatch({
          type: CREATE_TASK_SUCCESS,
        })
        getProjectNoLoading(id)
        dispatch({ type: CLEAR_VALUES })
      } catch (error) {
        if (error.response.status === 401) return
        dispatch({
          type: CREATE_TASK_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }
    const editTask = async (id, [taskId, taskData]) => {
      dispatch({ type: EDIT_TASK_BEGIN })
  
      try {
        await authFetch.patch(`/projects/${id}/taskUpdate`, { 
            taskId,
          taskData
        })
        dispatch({ type: EDIT_TASK_SUCCESS })
        getProjectNoLoading(id)
      } catch (error) {
        if (error.response.status === 401) return
        dispatch({
          type: EDIT_TASK_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }
    const addUser = async (id, newUser) => {
      dispatch({ type: ADD_USER_BEGIN })

      try {
        await authFetch.patch(`/projects/${id}/addUser`, {
          id,
          newUser
        })
        dispatch({ type: ADD_USER_SUCCESS })
        getProject(id)
      } catch (error) {
        if (error.response.status === 401) return
        dispatch({
          type: ADD_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
    }
    clearAlert()
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        createProject,
        getProjects,
        getProject,
        editProject,
        deleteProject,
        createTask,
        editTask,
        addUser,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState}