import { useState, useEffect } from "react";
import { PlayListIcon } from "../icons/Svgs"
import PopUpAuth from "../shared/PopUpAuth"
import PopUpPlayList from "../shared/PopUpPlayList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PrincipalLayout = ({ children }) => {
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [isShowPlayList, setIsShowPlayList] = useState(false);

  const tracks = useSelector((store) => store.playListCard.tracks);

  useEffect(() => {
    if (isShowPlayList) {
      if (isShowAuth) setIsShowAuth(false)
    }
  }, [isShowPlayList])

  useEffect(() => {
    if (isShowAuth) {
      if (isShowPlayList) setIsShowPlayList(false)
    }
  }, [isShowAuth])


  return (
    <section className="bg-dark h-screen text-white font-urbanist grid grid-rows-[auto_1fr] bg-[url(/images/out-bg-1.png)] bg-no-repeat bg-right-bottom md:bg-[url(/images/out-bg-2.png)] transition-all">
      <header className="relative bg-primary-dark flex justify-between p-4 px-4 uppercase items-center">
        <Link to={"/"}>
          <h1 className="font-semibold text-lg">Gift music</h1>
        </Link>

        <div className="flex gap-3">
          <button onClick={() => setIsShowAuth(!isShowAuth)} className={`${isShowAuth && "bg-primary-light"} uppercase p-2 px-4 border border-secondary bg-transparent rounded-full font-semibold hover:bg-primary-light transition-colors text-sm sm:text-base`}>Mi cuenta</button>
          <button onClick={() => setIsShowPlayList(!isShowPlayList)} className={`${isShowPlayList && "bg-primary-light"} uppercase p-2 px-4 border border-secondary bg-transparent rounded-full font-semibold hover:bg-primary-light transition-colors flex items-center gap-2`}><PlayListIcon /> <span className="hidden sm:inline">Grabando </span>{tracks.length}</button>
        </div>
      </header>
      <section className="py-14 px-4 overflow-y-auto">
        <main className="w-[min(520px,_100%)] bg-primary-dark mx-auto py-8 px-6 sm:px-14 rounded-3xl">
          {children}
        </main>
      </section>
      {/* Seccion pop auth */}
      <PopUpAuth isShowAuth={isShowAuth} />
      <PopUpPlayList isShowPlayList={isShowPlayList} />
    </section>
  )
}

export default PrincipalLayout