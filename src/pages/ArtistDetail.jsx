import { Link, useParams } from "react-router-dom"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import { useEffect, useState } from "react"
import axiosMusic from "../utils/configAxios"
import TrackCard from "../components/shared/TrackCard"
import SpotifySong from "../components/shared/SpotifySong"

const ArtistDetail = () => {
  const [artista, setArtista] = useState(null);
  const [tracksRecomendation, setTracksRecomendation] = useState(null)
  const {id} = useParams()

  const [currentSong, setCurrentSong] = useState(null)

  const showPlayBtn = (idTrack) => {
    setCurrentSong(idTrack)
  }

  const popularidad =()=>{
    let valorEvaluar = 0;
    let porcentaje;
    const p = artista?.popularity;
    const valoresFijos = [0,40,60,80,90,100];

    for(let i=0; i<=valoresFijos.length; i++){
      if(p>=valoresFijos[i]){
        valorEvaluar = valorEvaluar+1
        porcentaje= valorEvaluar
      }else{
        valorEvaluar=0
      }
    }

    return porcentaje
  }

  useEffect(() => {
    axiosMusic.get(`/api/artists/${id}`)
    .then(({data})=>setArtista(data))
    .catch((err)=>console.log(err))
  }, [])

  useEffect(() => {
    axiosMusic.get("/api/tracks/recommendations?seed_genres=reggae,rock,salsa,latino")
    .then(({data})=>setTracksRecomendation(data.tracks))
    .catch((err)=>console.log(err))
  }, [])
  
  
  console.log(artista)
  console.log(popularidad())
  return (
    <PrincipalLayout>
      <Link to={-1} className=" text-secondary">{"<"}Atras</Link>
      <header className=" grid gap-4 mt-2 mb-8 sm:grid-cols-2 sm:items-center">
        <div className=" rounded-full w-[180px] overflow-auto mx-auto">
          <img src={artista?.images[1].url} alt="" />
        </div>
        <div className="grid">
          <h2 className=" font-semibold text-[20px]">{artista?.name}</h2>
          <span className=" font-semibold text-[15px]">Segidores: {artista?.followers.total}</span>
          <div className="flex font-semibold justify-items-center">
            <span>Popularidad: </span> <div><i className={`bx ${popularidad() >= 1 ? "bxs-heart":"bx-heart"}`}></i> <i className={`bx ${popularidad() >= 2 ? "bxs-heart":"bx-heart"}`}></i> <i className={`bx ${popularidad() >= 3 ? "bxs-heart":"bx-heart"}`}></i> <i className={`bx ${popularidad() >= 4 ? "bxs-heart":"bx-heart"}`}></i> <i className={`bx ${popularidad() >= 5 ? "bxs-heart":"bx-heart"}`}></i></div> 
          </div>
          <div>
            <span className="font-semibold">Generos : </span>
            <ul className="flex gap-2 mt-2">
              {
                artista?.genres.slice(0,2).map((genre)=> (
                <li key={genre}>
                  <div className="genero border-2 border-[#A284F6] uppercase text-sm sm:text-xs sm:px-4">{genre}</div>
                </li>))
              }
            </ul>
          </div>
        </div>
      </header>
      {
        currentSong && <SpotifySong idTrack={currentSong} />
      }
      {
        tracksRecomendation?.map((track)=> <TrackCard key={track.id} track={track} showPlayBtn={showPlayBtn} showAddIcon/>)
      }
    </PrincipalLayout>
  )
}

export default ArtistDetail