import React from 'react'
import Playlists from './Playlists'

function Sidebar() {
  
  const styles = {
    sidebarContainer: "w-full h-full pl-4 pr-4 bg-black text-gray-500",
    sidebarFlexbox: "w-full flex flex-col",
    logoContainer: "w-fit m-auto mb-4",
    logo: "sm:h-28 md:h-20 object-center",
    list: "flex flex-col space-y-4 ",
    listElement: "flex space-x-4 hover:cursor-pointer transition ease-in-out duration-300 hover:text-white",
}
  return (
    <div className={styles.sidebarContainer}>
           <div className={styles.sidebarFlexbox}>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify logo"/> 
              </div>
              <br></br>
              <ul className={styles.list}>
                <li className={styles.listElement}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span>Home</span>
                </li>
                <li className={styles.listElement}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span>Search</span>
                </li>
                <li className={styles.listElement}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span>Your Library</span>
                </li>
              </ul>
              <Playlists/>
           </div>
    </div>
  )
}

export default Sidebar