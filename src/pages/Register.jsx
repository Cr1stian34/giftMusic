import { Link, useNavigate } from "react-router-dom"
import ContainerAuth from "../components/layouts/ContainerAuth"
import axiosMusic from "../utils/configAxios";

const Register = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    axiosMusic.post("/api/auth/register", data)
      .then(({ data }) => {
        alert("Usuario registrado correctamente")
        navigate("/login")
      })
      .catch((err) => console.log(err))
  }
  return (
    <ContainerAuth>
      {/* banner imagen */}
      <div className="hidden md:block max-w-[400px]">
        <img src="/images/register.png" alt="" />
      </div>
      {/* formulario */}
      <form onSubmit={handleSubmit} action="" className="[&>label]:grid [&>label]:gap-5 grid gap-6 text-center w-[min(100%,300px)] mx-auto items-center">
        <h1 className="text-3xl uppercase font-semibold">Cuenta Nueva</h1>
        <label htmlFor="">
          <span className="text-slate-300/50  text-sm text-start">E-mail</span>
          <input name="email" className="bg-transparent border-b border-secondary outline-none" type="email" />
        </label>

        <label htmlFor="">
          <span className="text-slate-300/50  text-sm text-start">Nombre de usuario</span>
          <input name="name" className="bg-transparent border-b border-secondary outline-none" type="text" />
        </label>

        <label htmlFor="">
          <span className="text-slate-300/50  text-sm text-start">Contraseña</span>
          <input name="password" className="bg-transparent border-b border-secondary outline-none" type="password" />
        </label>

        <button className=" bg-primary-light rounded-full py-1 px-10 max-w-max mx-auto uppercase text-sm font-semibold shadow-lg shadow-purple-400/40 hover:tracking-widest transition-all" type="submit" >Crear</button>
        <Link to="/login">O iniciar sesion</Link>
      </form>

    </ContainerAuth>

  )
}

export default Register