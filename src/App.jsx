import React, { useEffect } from 'react'

const App = () => {



  return (
    <main className='w-screen min-h-screen'>
      
    <form className='w-[300px] h-auto p-4'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="nama">Nama Mahasiswa</label>
        <input type="text" id='nama' className='border border-slate-400' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="nim">Nim</label>
        <input type="text" id='nim' className='border border-slate-400' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="alamat">Alamat </label>
        <input type="text" id='alamat' className='border border-slate-400' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="telepon">Telepon</label>
        <input type="tel" id='telepon' className='border border-slate-400' />
      </div>

      <button>SUBMIT</button>
    </form>
    </main>
  )
}

export default App