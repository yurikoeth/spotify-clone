import React from 'react'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import Volume from './Volume';


function Footer() {

  const styles ={
    footerContainer: "h-full w-full bt border-solid border-[#282828] grid grid-cols-[1fr_2fr_1fr] items-center justify-center px-5",
  }
  return (
    <div className={styles.footerContainer}>
      <CurrentTrack/>
      <PlayerControls/> 
      <Volume/>
    </div>
  )
}

export default Footer