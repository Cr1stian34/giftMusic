import { useEffect, useState } from "react"
import { PlayListIcon, SearchIcon } from "../components/icons/Svgs"
import axiosMusic from "../utils/configAxios"
import TrackList from "../components/shared/TrackList"

const Home = () => {
  const [tracksRecommentadions, setTracksRecommentadions] = useState([]);
  const [searchTracks, setSearchTracks] = useState([])

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

  console.log(tracksRecommentadions)
  
  return (
    <section className="bg-dark h-screen text-white font-urbanist grid grid-rows-[auto_1fr] bg-[url(/images/out-bg-1.png)] bg-no-repeat bg-right-bottom md:bg-[url(/images/out-bg-2.png)] transition-all">
      <header className="bg-primary-dark flex justify-between p-4 px-4 uppercase items-center">
        <h1 className="font-semibold text-lg">Gift music</h1>
        <div className="flex gap-3">
          <button className="uppercase p-2 px-4 border border-secondary bg-transparent rounded-full font-semibold hover:bg-primary-light transition-colors text-sm sm:text-base">Mi cuenta</button>
          <button className="uppercase p-2 px-4 border border-secondary bg-transparent rounded-full font-semibold hover:bg-primary-light transition-colors flex items-center gap-2"><PlayListIcon/> <span className="hidden sm:inline">Grabando </span>1</button>
        </div>
      </header>
      <section className="py-14 px-4 overflow-y-auto">
        <main className="w-[min(520px,_100%)] bg-primary-dark mx-auto py-8 px-6 sm:px-14 rounded-3xl">
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
        </main>
      </section>
    </section>
  )
}

export default Home