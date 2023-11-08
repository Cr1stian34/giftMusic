import { Link } from "react-router-dom"
import { CloseSeccionIcon, Picon } from "../icons/Svgs"
import { logOut } from "../../store/slices/user.slice"
import { useDispatch } from "react-redux"

const PopUpAuth = ({isShowAuth}) => {
    const dispatch = useDispatch()
    const handleLogOut =()=> dispatch(logOut())
    // console.log(isShowAuth)
  return (
    <nav className={`${isShowAuth? "right-10": "-right-full"} transition-all fixed top-24 bg-primary-light uppercase grid p-4 rounded-md text-start font-semibold border-secondary`}>
        <Link className="flex gap-2 hover:text-[#3E14B5] items-center group transition-colors" to={"/playlists"}><Picon/> Mis grabaciones</Link>
        <button onClick={handleLogOut} className="uppercase flex gap-2 hover:text-[#3E14B5] items-center group transition-colors"><CloseSeccionIcon/> Cerrar Sesion</button>
    </nav>
  )
}

export default PopUpAuth