import landingImage from '../assets/images/landingImage.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            project <span>planning</span> app
          </h1>
          <p>
          A web app created for planning projects and following task.
          Stay on track to reach your goals, faster.
          Bring teams together and plan your success.
          Collaborate effectively organization-wide to get a clear picture of all your work. 
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
          <span> </span>
          <Link to='/' className='btn btn-hero'>
            Home
          </Link>
        </div>
        <img src={landingImage} alt='dashboard' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing