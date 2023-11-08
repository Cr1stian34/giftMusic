import { useEffect, useState } from "react"
import { SearchIcon } from "../components/icons/Svgs"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import axiosMusic from "../utils/configAxios"
import PlaylistLists from "../components/playlists/PlaylistLists"

const PlayLists = () => {
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    axiosMusic.get("/api/playlists/me")
    .then(({data})=>setPlaylists(data))
    .catch((err)=>console.log(err))
  }, [])
  
  return (
    <PrincipalLayout>
      <form className="bg-white/20 p-2 px-4 rounded-md flex gap-4 items-center" action="">
        <button>
          <SearchIcon />
        </button>
        <input size={10} autoComplete="off" className="bg-transparent outline-none flex-1" placeholder="Buscar" type="text" name="query" />
      </form>
      <PlaylistLists playlists={playlists}/>
    </PrincipalLayout>
  )
}

export default PlayLists