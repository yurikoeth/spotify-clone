import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useStateProvider } from "../utilities/StateProvider"


function Navbar() {

  const [{ userInfo }] = useStateProvider();
  const styles = {
    navbarContainer: "flex justify-between items-center p-6 h-[15vh] sticky top-0 transition ease-in duration-300 w-full bg-black/80 mb-8",
    searchbarContainer: "flex bg-white w-3/4 py-5 px-4 rounded-[2rem] flex items-center gap-2",
    searchInput: "border-none h-8 w-full focus:outline-none text-black",
    avatarContainer: "py-[0.3rem] py-[0.4rem] pr-4 pl-4 rounded-[2rem] flex justify-center items-center",
    anchor: "flex justify-center items-center gap-2 no-underline font-bold",
    avatar: "text-2xl text-[#c7c5c5]"
  }
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.searchbarContainer}>
        <FaSearch/>
        <input className={styles.searchInput} type="text" placeholder="Artists, songs, or podcasts"/>
      </div>
      <div className={styles.avatarContainer}>
        <button className={styles.anchor} href="#">
          <CgProfile className={styles.avatar}/>
          <span>
            {userInfo?.userName}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Navbar