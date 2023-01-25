import React, { useEffect } from 'react'
import { AiFillClockCircle } from "react-icons/ai"
import { useStateProvider } from "../utilities/StateProvider"
import axios from "axios"
import { reducerCases } from '../utilities/Constants'

function Body() {

  const [{ token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider();
  useEffect(() => {
    const getInitialPlayist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type" : "application/json",
                },
            }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description :  response.data.description.startsWith("<a")
        ? ""
        : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track}) => ({
          id: track.id,
          name: track.name, 
          artists: track.artists.map((artist) => artist.name).join(", "),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        }))
      }
      dispatch({type:reducerCases.SET_PLAYLIST, selectedPlaylist})
    };
    getInitialPlayist();
  }, [token, dispatch,selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) =>{
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds <10 ? "0" : "") + seconds;
  }
  
  const playTrack = async (id,name,artists,image,context_uri,track_number) => {
   const response = await axios.put(`https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number-1
        },
        position_ms: 0,
      }, 
      {
        headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                  },
      }
    );
    if(response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying})
      dispatch({type:reducerCases.SET_PLAYER_STATE, playerState:true})
    }
    else{
      dispatch({type:reducerCases.SET_PLAYER_STATE, playerState:true})
    }
  }


  const styles = {
    container: "scrollbar-hide overflow-hidden",
    playlist: "mx-8 my-0 flex items-center gap-8 ",
    imageContainer: "",
    playlistImage: "h-[15rem] shadow-[rgba(0,0,0,0.25)_0px_25px_50px_-12pxs]",
    details: "flex flex-col gap-4 text-[e0dede]",
    type: "",
    title: "text-white text-[4rem]",
    description: "",
    list: "",
    headerRow: "grid grid-cols-[0.3fr_3fr_2.05fr_0.1fr_] m-0 mt-4 py-4 px-12 transition duration-300 ease-in-out",
    col: "flex items-center text-[#dddccc]",
    colDetail: "flex items-center text-[#dddccc] gap-4",
    image: "h-10",
    tracks: "py-8 px-0 flex flex-col mb-20",
    row: "py-2 px-6 pl-12 grid grid-cols-[0.3fr_3.1fr_2.1fr_0.1fr_] cursor-pointer hover:bg-black/60",
    info: "flex flex-col",
    name: ""

  }

  return (
    <div className={styles.container}>
      {
        selectedPlaylist && (
          <>
            <div className={styles.playlist}>
              <div className={styles.imageContainer}>
                <img className={styles.playlistImage} src={selectedPlaylist.image} alt="selectedplaylist"></img>
              </div>
              <div className={styles.details}>
                <span className={styles.type}>PLAYLIST</span>
                <h1 className={styles.title}>{selectedPlaylist.name}</h1>
                <p className={styles.description}></p>
              </div>
            </div>
            <div className={styles.list}>
                <div className={styles.headerRow}>
                  <div className={styles.col}>
                    <span>#</span>
                  </div>
                  <div className={styles.col}>
                    <span>TITLE</span>
                  </div>
                  <div className={styles.col}>
                    <span>ALBUM</span>
                  </div>
                  <div className={styles.col}>
                    <span>
                      <AiFillClockCircle/>
                    </span>
                  </div>
                </div>
                <div className={styles.tracks}>
                  {
                    selectedPlaylist.tracks.map(({
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number
                    }, index) => {
                      return (
                        <div className={styles.row} key={id} onClick={() => playTrack(id,name,artists,image,context_uri,track_number)}>
                          <div className={styles.col}>
                            <span>{index+1}</span>
                          </div>
                          <div className={styles.colDetail}>
                            <div className={styles.imageContainer}>
                              <img className={styles.image} src={image} alt="track"></img>
                            </div>
                            <div className={styles.info}>
                              <span className={styles.name}>{name}</span>
                              <span>{artists}</span>
                            </div>
                          </div>
                          <div className={styles.col}>
                            <span>{album}</span>
                          </div>
                          <div className={styles.col}>
                            <span>{msToMinutesAndSeconds(duration)}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Body