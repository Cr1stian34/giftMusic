import { Link } from "react-router-dom"
import { AddIcon, PlayIcon } from "../icons/Svgs"

const TrackCard = ({track}) => {
    // const lastIndexArtist =track.artists.length -1;
    // console.log(track)
  return (
    <article className="flex gap-4 items-center hover:bg-white/20 transition-colors rounded-md p-1">
        <div className="w-[58px] h-[58px] rounded-md overflow-hidden">
            <img src={track.album.images[2].url} alt="" />
        </div>
        <div className="flex-1 text-sm gap-2">
            <Link to={`/tracks/${track.id}`} className="font-semibold line-clamp-1 hover:text-secondary transition-colors" >{track.name}</Link>
            {/* <h5 className="text-slate-400 line-clamp-1">{track.artists[0].name}</h5>
             */}
             <ul className="flex gap-2">
                {
                    track.artists.slice(0,2).map((artist, index, array)=>(
                        <li key={artist.id}>
                            <Link className="hover:text-secondary transition-colors line-clamp-1" to={`/artists/${artist.id}`}>
                               {artist.name} { array.length-1 !== index && ","}
                            </Link>
                        </li>
                    ))
                }
             </ul>
        </div>
        <div className="flex gap-2 pr-1">
            <button><PlayIcon/></button>
            <button><AddIcon/></button>
        </div>
    </article>
  )
}

export default TrackCard