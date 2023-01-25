import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'
import { useStateProvider } from "../utilities/StateProvider"
import axios from "axios";
import { reducerCases } from '../utilities/Constants'

const Spotify = () => {

  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type" : "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
      };  
      dispatch({type:reducerCases.SET_USER, userInfo})
      }
      getUserInfo();
    }, [dispatch, token])

    
    const styles = {
        container: "max-h-screen max-w-screen h-screen w-screen overflow-hidden flex flex-col text-white bg-[rgb(32,_87,_100)] bg-gradient-to-b from-transparent to-[rgba(0,_0,_0,_1)]",
        bodyContainer: "w-full max-w-screen h-5/6 flex overflow-hidden",
        sidebar: "w-1/6",
        player: "overflow-auto w-5/6", 
        footerContainer: "h-1/6 w-screen max-w-screen",

  }
  return (
    <div className={styles.container}>
        <div className={styles.bodyContainer}>
          <div className={styles.sidebar}>
            <Sidebar/>
          </div>
          <div className={styles.player}>
            <Navbar/>
            <Body/>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <Footer/>
        </div>
    </div>
  )
}

export default Spotify