import React from 'react'
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle 
} from "react-icons/bs";
import {CgPlayTrackNext, CgPlayTrackPrev} from "react-icons/cg";
import {FiRepeat} from "react-icons/fi";
import { useStateProvider } from "../utilities/StateProvider";
import axios from 'axios';
import { reducerCases } from '../utilities/Constants';

function PlayerControls() {

  const [{token, playerState}, dispatch] = useStateProvider();
  const changeTrack = async (type) => {
    await axios.post(`https://api.spotify.com/v1/me/player/${type}`,
    {}, 
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
          });
          const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", 
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
              },
            }
          );

          if (response.data !=="") {
            const { item } = response.data;
            const currentlyPlaying = {
              id: item.id,
              name: item.name,
              artists: item.artists.map((artists) => artists.name),
              image: item.album.images[2].url,
            };
              dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying});
            }
            else 
            {
              dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying: null });
            }          
          }
  const changeState = async () => {
    const state = playerState ? "pause" : "play"
    await axios.put(`https://api.spotify.com/v1/me/player/${state}`,
      {}, 
      {
        headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                  },
                });
      dispatch({type:reducerCases.SET_PLAYER_STATE, playerState: !playerState })
    }
          
  
          
  const styles = {
    container: "flex items-center justify-center gap-8",
    icons: "text-[#b3b3b3] transition ease-in-out duration-200 cursor-pointer hover:text-white",
    stateIcons: "text-white text-[2rem] hover:text-[2.3rem] ", 
    shuffle: "text-[1.6rem] hover:text-[2rem] cursor-pointer",
    previous: "text-[2rem] hover:text-5xl hovercursor-pointer",
    state: "text-[2rem] cursor-pointer",
    next: "text-[2rem] hover:text-5xl cursor-pointer",
    repeat: "text-[1.5rem] hover:text-[2rem] cursor-pointer",
  }
  return (
    <div className={styles.container}>
      <div>
        <BsShuffle className={styles.shuffle}/>
      </div>
      <div>
        <CgPlayTrackPrev className={styles.previous} onClick={()=>changeTrack("previous")} />
      </div>
      <div className={styles.state}>
        {
          playerState ? <BsFillPauseCircleFill className={styles.stateIcons} onClick={changeState} /> : <BsFillPlayCircleFill className={styles.stateIcons} onClick={changeState} />
        }
      </div>
      <div className={styles.nextContainer}>
          <CgPlayTrackNext className={styles.next} onClick={()=>changeTrack("next")}/>
        </div>
        <div>
          <FiRepeat className={styles.repeat}/>
        </div>
    </div>
  )
}

export default PlayerControls