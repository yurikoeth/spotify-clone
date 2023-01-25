import React, {useEffect} from 'react'
import { useStateProvider } from "../utilities/StateProvider"
import axios from "axios";
import { reducerCases } from '../utilities/Constants';

const CurrentTrack = ({curr}) => {

    const [{token, currentlyPlaying}, dispatch] = useStateProvider();
      useEffect(() => {
      const getCurrentTrack = async () => {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", 
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
          }
        );
        if (response.data !==""){
            const { item } = response.data;
            const currentlyPlaying = {
                id: item.id,
                name: item.name,
                artists: item.artists.map((artists) => artists.name),
                image: item.album.images[2].url,
            };
            dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying});
        };
      }
      getCurrentTrack();
    }, [token, dispatch]);

    const styles = {
        track: "flex items-center gap-4",
        currentlyPlayingImage: "",
        trackInfo: "flex flex-col gap-[0.1rem]",
        h4: "hover:underline cursor-pointer",
        h6: "hover:underline cursor-pointer text-[#b3b3b3]",
    }

  return (
    <div>
        {currentlyPlaying && (
            <div className={styles.track}>
                <div className={styles.trackImage}>
                    <img src={currentlyPlaying.image} alt="currentlyplaying"></img>
                </div>
                <div className={styles.trackInfo}>
                    <h4 className={styles.h4}>{currentlyPlaying.name}</h4>
                    <h6 className={styles.h6}>{currentlyPlaying.artists.join(", ")}</h6>
                </div>
            </div>
        )}
    </div>
  )
}

export default CurrentTrack