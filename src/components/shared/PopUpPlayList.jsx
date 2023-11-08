import { useState } from "react"
import "./PopUpPlayList.css"
import { GirarIcon, PencilIcon } from "../icons/Svgs"
import { useDispatch, useSelector } from "react-redux"
import TrackCard from "./TrackCard"
import axiosMusic from "../../utils/configAxios"
import { clearTracks } from "../../store/slices/playListCard.slice"

const PopUpPlayList = ({ isShowPlayList }) => {
    const [isShowFront, setIsShowFront] = useState(true)
    //${isShowPlayList? "right-10": "-right-full"}
    const tracks = useSelector((store)=> store.playListCard.tracks);
    const dispatch = useDispatch()

    const handleSubmit =(even)=>{
        even.preventDefault();
        const data ={
            title: even.target.title.value,
            to: even.target.to.value,
            message: even.target.message.value,
            tracks: tracks
        }

        axiosMusic
        .post("/api/playlists", data)
        .then(({data})=>{
            even.target.reset()
            dispatch(clearTracks())
            alert("PlayList creada correctamente")    
        })
        .catch((err)=>console.log(err))
    }

    return (
        <form onSubmit={handleSubmit} className={`${isShowPlayList ? "right-10" : "-right-full"} w-[275px] transition-all fixed top-24 bg-primary-light uppercase grid p-4 rounded-md text-start font-semibold border-secondary`}>
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

            <section className="normal-case font-normal max-h-[200px] overflow-y-auto">
                {
                    tracks.map((track)=> <TrackCard track={track} key={track.id} imageSize="sm" showRemoveBtn/>)
                }
            </section>

            <button className="border-2 border-white uppercase p-2 px-4 rounded-full max-w-max mx-auto hover:text-secondary hover:border-secondary transition-colors">crear</button>
        </form>
    )
}

export default PopUpPlayList