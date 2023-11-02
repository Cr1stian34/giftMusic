import TrackCard from "./TrackCard"

const TrackList = ({tracks}) => {
    console.log(tracks)
  return (
    <section className="grid gap-3 pt-6">
        {
            tracks.map((track) => <TrackCard key={track.id} track={track}/>)
        } 
    </section>
  )
}

export default TrackList