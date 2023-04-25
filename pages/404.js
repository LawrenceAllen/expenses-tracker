import { Header } from '../components/global/header/header'

export default function Custom404() {
  return <>
    <main className='w-full'>
      <Header />
      <div className='flex flex-col justify-center items-center w-full pt-24 text-2xl'>
        <h1>404 - Page not found</h1>
      </div>
    </main>
  </>
}
