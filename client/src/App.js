import Landing from './pages/Landing'
import Error from './pages/Error'
import Register from './pages/Register'
import Project from './pages/Dashboard/Project'
import Profile from './pages/Dashboard/Profile'
import AddProject from './pages/Dashboard/AddProject'
import Overview from './pages/Dashboard/Overview'
import SharedLayout from './pages/Dashboard/SharedLayout'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="project/:id" element={<Project/>}/>
          <Route path="add-project" element={<AddProject/>}/>
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
