import React from 'react'
import { useStateProvider } from '../utilities/StateProvider'
import axios from "axios";
import { reducerCases } from '../utilities/Constants';

const Volume = () => {
    const [{token}] = useStateProvider();
    const setVolume = async (e) => {
        await axios.put(
        `https://api.spotify.com/v1/me/player/volume`,
        {},
        {
            params: {
                volume_percent: parseInt(e.target.value)
            }, 
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
          }
        );
    };

    const styles = {
        container: "flex justify-end items-center",
        volume: "w-60 border rounded-[2rem] h-2"
    }
  return (
    <div className={styles.container}>
        <input className={styles.volume} type="range" min={0} max={100} onMouseUp={(e=>setVolume(e))}/>
    </div>
  )
}

export default Volume