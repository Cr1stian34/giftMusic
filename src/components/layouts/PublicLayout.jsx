
export const PublicLayout = ({children}) => {
  return (
    <section className="bg-dark h-screen text-white font-urbanist grid grid-rows-[auto_1fr] bg-[url(/images/out-bg-1.png)] bg-no-repeat bg-right-bottom md:bg-[url(/images/out-bg-2.png)] transition-all">
    <header className="relative bg-primary-dark flex justify-center p-4 px-4 uppercase">
      <h1 className="font-semibold text-lg text-center">Gift music</h1>
    </header>
    <section className="py-14 px-4 overflow-y-auto">
      <main className="w-[min(520px,_100%)] bg-primary-dark mx-auto py-8 px-6 sm:px-14 rounded-3xl">
        {children}
      </main>
    </section>
  </section>
  )
}
