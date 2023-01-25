import React,{ useEffect } from 'react'
import { useStateProvider } from "../utilities/StateProvider"
import axios from "axios";
import { reducerCases } from '../utilities/Constants';


function Playlists() {

    const [{token, playlists}, dispatch] = useStateProvider()
    useEffect(() => {
      const getPlaylistData = async () => {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
          }
        )
        const {items} = response.data;
        const playlists = items.map(({name, id}) => {
          return {name, id};
        });
        dispatch({type:reducerCases.SET_PLAYLISTS, playlists});
      }
      getPlaylistData();
    }, [token, dispatch])

      const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({type:reducerCases.SET_PLAYLIST_ID, selectedPlaylistId});
        console.log(selectedPlaylistId)
      };

    const styles = {
        playlistContainer: "mt-5 h-full overflow-hidden ",
        playlistHeader: "text-white text-sm",
        playlists: "text-white text-sm",
        horizontalRow: "mt-2 mb-2 border-gray-800",
        list: "flex flex-col space-y-4 h-[54vh] max-h-full overflow-auto ",
        listElement: "flex space-x-4 hover:cursor-pointer transition ease-in-out duration-300 hover:text-white",
    }
  return (

    <div className={styles.playlistContainer}>
        <strong className={styles.playlistHeader}>PLAYLISTS</strong>
        <hr className={styles.horizontalRow}></hr>
          <ul className={styles.list}>
              {
                playlists.map(({name, id}) => {
                  return (
                    <li className={styles.listElement} key={id} onClick={() => changeCurrentPlaylist(id)}>
                      {name}
                    </li>
                  )
                })
              }
              </ul>
    </div>
  )
}

export default Playlists