import { useState } from "react"
import TrackCard from "./TrackCard"
import SpotifySong from "./SpotifySong"

const TrackList = ({ tracks }) => {
  const [currentSong, setCurrentSong] = useState(null)

  const showPlayBtn = (idTrack) => {
    setCurrentSong(idTrack)
  }
  return (
    <section className="grid gap-3 pt-6">

      {
        currentSong && <SpotifySong idTrack={currentSong} />
      }


      {
        tracks.map((track) => <TrackCard key={track.id} track={track} showAddIcon showPlayBtn={showPlayBtn} />)
      }
    </section>
  )
}

export default TrackList