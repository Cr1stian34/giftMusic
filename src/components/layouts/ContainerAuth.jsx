
const ContainerAuth = ({children}) => {
  return (
    <main className="bg-dark text-white font-urbanist h-screen grid items-center px-4 bg-[url(/images/out-bg-1.png)] bg-no-repeat bg-right-bottom sm:bg-[url(/images/out-bg-2.png)] transition-all">
      <section className="grid md:grid-cols-[auto_400px] md:justify-center gap-10">
        {children}
      </section>
    </main>
  )
}

export default ContainerAuth