import React from 'react'
import { PencilIcon } from '../icons/Svgs'
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist, index }) => {
  const x = `${index * 47}px`;
  // console.log(x)

  return (
    <li className='absolute text-black font-bold hover:rotate-6 hover:-translate-y-4 transition-transform' style={{ top: x }}>
      <Link to={`/playlists/${playlist.id}`}>
        <div>
          <img src="/images/cassette.png" alt="" />
        </div>
        <div className="absolute top-[15px] left-[20px] gap-1 text-sm bg-white flex p-1 items-center rounded-md w-[198px]">
          <h4 className='flex-1 line-clamp-1'>{playlist.title}</h4>
          <PencilIcon />
        </div>
      </Link>

    </li>
  )
}

export default PlaylistCard