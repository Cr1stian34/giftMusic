import { useEffect, useState } from "react"
import { PublicLayout } from "../components/layouts/PublicLayout"
import { Link, useParams } from "react-router-dom"
import { AddIcon, GirarIcon, ShareIcon } from "../components/icons/Svgs"
import axiosMusic from "../utils/configAxios"
import { data } from "autoprefixer"
import TrackCard from "../components/shared/TrackCard"
import SpotifySong from "../components/shared/SpotifySong"

const PlayListPublic = () => {
  const [isShowFront, setIsShowFront] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null)

  const {id} = useParams()
  // console.log(playlist)
  const playTrack = (idTrack)=>{
    setCurrentSong(idTrack)
  }

  const handleCopyUrl =()=>{
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(()=> alert("copiado en el corta papeles"))
  }

  useEffect(() => {
    axiosMusic.get(`/api/playlists/${id}`)
    .then(({data})=>{
      setPlaylist(data)
    })
    .catch((err)=>console.log(err))
  }, [])
  
  return (
    <PublicLayout>
      <article className=" transition-all top-24 grid justify-center rounded-md font-semibold">
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          {/* frontal */}
          <div className="front">
            <img src="/images/cassette.png" alt="" />
            <div className="absolute top-[15px] left-[20px] gap-1 text-sm bg-white flex p-1 items-center rounded-md w-[198px]">
              <h3 className="bg-transparent flex-1 outline-none text-black">{playlist?.title}</h3>
            </div>

            <button onClick={handleCopyUrl} type="button" className="absolute bottom-4 right-[4rem]"><ShareIcon /></button>
            <button type="button" className="absolute bottom-[0.85rem] right-5"><AddIcon width={40} height={42} /></button>
          </div>
          {/* trasera */}
          <div className=" absolute top-0 back">
            <img src="/images/cassette.png" alt="" />
            <div className="absolute top-[15px] left-[20px] gap-1 text-sm bg-white flex p-1 items-center rounded-md w-[198px]">
              <span className="bg-transparent flex-1 outline-none text-black">{playlist?.to}</span>
            </div>

            <div className="text-black h-[100px] overflow-y-auto absolute top-[50px] left-[20px] text-sm gap-1 bg-white rounded-md w-[198px]">
                <p>{playlist?.message}</p>
            </div>
          </div>

        </div>
        <button className="flex gap-1 items-center border-2 border-white uppercase p-1 mb-2 px-4 rounded-full max-w-max mx-auto hover:text-secondary hover:border-secondary transition-colors text-sm" type="button" onClick={() => setIsShowFront(!isShowFront)} >
          {
            isShowFront ? "Lado B" : "Lado A"
          }
          <GirarIcon />
        </button>
      </article>

      {
        currentSong && <SpotifySong idTrack={currentSong} />
      }
      
      <section>
        {
          playlist?.tracks.map((track)=> <TrackCard key={track.id} track={track} playTrack={playTrack}/>)
        }
      </section>
    </PublicLayout>
  )
}

export default PlayListPublic