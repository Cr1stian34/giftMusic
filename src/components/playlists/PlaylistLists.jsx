import PlaylistCard from "./PlaylistCard"

const PlaylistLists = ({playlists}) => {
  const alturaCasset = 180
  const x = 47
  const cantidadDeCasset = playlists.length

  const totalHeight = `${(cantidadDeCasset-1)*x + alturaCasset}px`
  return (
    <ul className="relative mt-8 grid place-items-center" style={{height: totalHeight}}>
        {
            playlists.map((playlist, index)=> <PlaylistCard key={playlist.id} playlist={playlist} index={index}/>)
        }
    </ul>
  )
}

export default PlaylistLists