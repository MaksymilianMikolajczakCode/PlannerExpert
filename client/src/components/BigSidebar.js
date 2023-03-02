import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'
import Logo from './Logo'
const BigSidebar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <header className='fixed'>
            <Logo/>
        </header>
          <div className='content'>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar