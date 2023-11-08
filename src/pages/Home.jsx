import { useEffect, useState } from "react"
import { CloseSeccionIcon, Picon, PlayListIcon, SearchIcon } from "../components/icons/Svgs"
import axiosMusic from "../utils/configAxios"
import TrackList from "../components/shared/TrackList"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import SpotifySong from "../components/shared/SpotifySong"

const Home = () => {
  const [tracksRecommentadions, setTracksRecommentadions] = useState([]);
  const [searchTracks, setSearchTracks] = useState([]);

  const handleSubmit =(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query")
    const limit = formData.get("limit")
    
    axiosMusic
    .get(`/api/tracks?limit=${limit}&q=${query}`)
    .then(({data})=>setSearchTracks(data.tracks.items))
    .catch((err)=>console.log(err))
  }
  
  useEffect(() => {
    axiosMusic
    .get("/api/tracks/recommendations?seed_genres=reggae,rock,salsa,latino")
    .then(({data})=>setTracksRecommentadions(data.tracks))
    .catch((err)=>console.log(err))
  }, [])

  // console.log(tracksRecommentadions)
  
  return (
      <PrincipalLayout>
            <form onSubmit={handleSubmit} className="bg-white/20 p-2 px-4 rounded-md flex gap-4 items-center" action="">
              <button>
                <SearchIcon/>
              </button>
              <input size={10} autoComplete="off" className="bg-transparent outline-none flex-1" placeholder="Buscar" type="text" name="query"/>
              <select className="bg-transparent outline-none [&>option]:text-black" name="limit" id="">
                <option>5</option>
                <option>7</option>
                <option>10</option>
                <option>12</option>
              </select>
            </form>
            
            <TrackList tracks={searchTracks.length===0 ? tracksRecommentadions:searchTracks}/>
        

        {/* <div className="absolute top-20 right-[15%] w-[200px] h-[auto] bg-primary-light p-2 grid gap-2 justify-center rounded-md">
          <button className="flex gap-2">
            <Picon/>
            Mis Grabaciones
          </button>
          <button className="flex gap-2">
            <CloseSeccionIcon/>
            Cerrar Sesion
          </button>
        </div> */}
      </PrincipalLayout>
  )
}

export default Home