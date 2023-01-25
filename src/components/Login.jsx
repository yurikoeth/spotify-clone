import React from 'react'

const Login = () => {
    const style = {
        login: "w-screen flex flex-col items-center bg-black text-white h-screen justify-between",
        logo: "mt-24",
        loginButton: "p-4 bg-green-500 rounded-3xl w-60 text-center font-bold mb-72 no-underline hover:cursor-pointer",
    }

    const handleClick = () => {
    const clientId = "a37080d89f434094a46b79545c5549e8";
    const redirectUrl = "http://localhost:3000/"
    const apiUrl = "https://accounts.spotify.com/authorize"
    const scope = [
      "user-read-email", 
      "user-read-private", 
      "user-modify-playback-state", 
      "user-read-playback-state", 
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
      )}&response_type=token&show_dialog=true`
    };
  return (
    <div className={style.login}>
      {/*spotify banner*/}
        <img 
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="spotify"
            className={style.logo}>
        </img>
        {/*login button*/}
        <button className={style.loginButton} onClick={handleClick}>CONNECT SPOTIFY</button>
    </div>
  )
}

export default Login