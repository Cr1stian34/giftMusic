import { useEffect, useRef, useState } from "react"
import { GirarIcon, PencilIcon, SaveIcon, ShareIcon, TrashIcon } from "../components/icons/Svgs"
import PrincipalLayout from "../components/layouts/PrincipalLayout"
import { Link, useNavigate, useParams } from "react-router-dom"
import axiosMusic from "../utils/configAxios"
import TrackCard from "../components/shared/TrackCard"

const PlayListDetail = () => {
  const [isShowFront, setIsShowFront] = useState(true);
  const [playlist, setPlaylist] = useState(null)
  const {id} = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate()

  const handleSubmit =(e)=>{
    e.preventDefault()
    const data = {
      title: e.target.title.value,
      to: e.target.to.value,
      message: e.target.message.value
    }

    axiosMusic.patch(`/api/playlists/${id}`, data)
    .then(({data})=>console.log(data))
    .catch((err)=>console.log(err))
  }

  const deleteTrack = (idTrack)=>{
    axiosMusic.delete(`/api/playlists/${playlist.id}/tracks/${idTrack}`)
    .then(({data})=>{
      const playListsCopy = structuredClone(playlist); //se hace una copia del arreglo de objetos de playlist copy
      playListsCopy.tracks = playListsCopy.tracks.filter((track)=> track.id !== idTrack);
      setPlaylist(playListsCopy);
    })
    .catch((err)=>console.log(err))
  }

  const deletePlaylist =()=>{
    axiosMusic.delete(`/api/playlists/${playlist.id}`)
    .then(({data})=>{
      alert("Playlist eleiminada correctamente")
      navigate("/playlists")
    })
    .catch((err)=>console.log(err))
  }

  useEffect(() => {
    axiosMusic.get(`/api/playlists/${id}`)
    .then(({data})=>{
      setPlaylist(data)
      formRef.current.title.value = data.title
      formRef.current.message.value = data.message
      formRef.current.to.value = data.to
    })
    .catch((err)=>console.log(err))
  }, [])
  
  return (
    <PrincipalLayout>
      <form onSubmit={handleSubmit} ref={formRef} className=" transition-all top-24 uppercase grid justify-center rounded-md font-semibold">
            <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
                {/* frontal */}
                <div className="front">
                    <img src="/images/cassette.png" alt="" />
                    <div className="absolute top-[15px] left-[20px] gap-1 text-sm bg-white flex p-1 items-center rounded-md w-[198px]">
                        <input className="bg-transparent flex-1 outline-none text-black" size={15} placeholder="Titulo" type="text" id="title" />
                        <label htmlFor="title">
                            <PencilIcon />
                        </label>
                    </div>
                    <button type="submit" className="absolute bottom-4 left-5"><SaveIcon/></button>
                    <button onClick={deletePlaylist} type="button" className="absolute bottom-4 left-[4rem]"><TrashIcon/></button>
                    <Link to={`/playlist/public/${playlist?.id}`} type="button" className="absolute bottom-4 right-5" target="blank" ><ShareIcon/></Link>
                </div>
                {/* trasera */}
                <div className=" absolute top-0 back">
                    <img src="/images/cassette.png" alt="" />
                    <div className="absolute top-[15px] left-[20px] gap-1 text-sm bg-white flex p-1 items-center rounded-md w-[198px]">
                        <input className="bg-transparent flex-1 outline-none text-black" size={15} placeholder="Destinatario" type="text" id="to" />
                        <label htmlFor="to">
                            <PencilIcon />
                        </label>
                    </div>

                    <div className="absolute top-[50px] left-[20px] text-sm flex gap-1 bg-white items-center rounded-md w-[198px]">
                        <textarea name="message" className=" resize-none outline-none text-black" rows={4} placeholder="mensaje"/>
                    </div>
                </div>

            </div>
            <button className="flex gap-1 items-center border-2 border-white uppercase p-1 mb-2 px-4 rounded-full max-w-max mx-auto hover:text-secondary hover:border-secondary transition-colors text-sm" type="button" onClick={() => setIsShowFront(!isShowFront)} >
                {
                    isShowFront? "Lado B": "Lado A"
                }
                <GirarIcon/>
            </button>
        </form>
        <section className="mt-6">
          {
            playlist?.tracks.map((track)=> <TrackCard key={track.id} track={track} deleteBtn={deleteTrack}/>)
          }
        </section>
    </PrincipalLayout>
  )
}

export default PlayListDetail