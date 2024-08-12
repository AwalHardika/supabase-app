import React, { useEffect, useState } from 'react'
import supabase from './connector';
import Chance from 'chance';

const App = () => {
  
  const [dataMhs, setDataMhs] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  let chance = new Chance()
  
  function generateData(){
    setLoading(true)
    let fakeData = []

    for(let i=0; i<=100; i++){
      let nama = chance.name()
      let nim = chance.character()
      let alamat = chance.address()
      let telepon = chance.phone()
      fakeData.push({
        nama, nim, alamat, telepon
      })
    }
    
    supabase.from("mahasiswa").insert(fakeData)
    .then(res=>{
      setRefresh(prev=> prev=!prev)
      setLoading(false)
    })

  }

  
  function handleSubmit(event){
    event.preventDefault();

    let nama = event.target.nama.value;
    let nim = event.target.nim.value;
    let alamat = event.target.alamat.value;
    let telepon = event.target.telepon.value;

    // console.info({nama, nim, alamat, telepon})
    supabase.from("mahasiswa").insert([{
      nama : nama,
      nim : nim,
      alamat : alamat,
      telepon : telepon
    }])
    .then(res=>{
      alert("Data Berhasil disimpan")
      setRefresh(prev => prev=!prev)
    })
    .catch((error) => {
      console.error(error);
    });

  }

  function handleDelete(id, nama){
  let conf = window.confirm("Yakin anda ingin delete data " + nama +" ?")
  if(!conf) return

  supabase.from("mahasiswa").delete().eq("id", id)
  .then(res=>{
    setRefresh(prev=> prev=!prev)
  })

  }

  function handleSelectAll(e){
    let checked = e.target.checked

    if(checked) {
      let allRows = dataMhs.map(e=> e.id)
      setSelectedRows(allRows)
    }
    else{
      setSelectedRows([])
    }
  }

  useEffect(()=>{
    console.log(selectedRows)
  }, [selectedRows])

  useEffect(()=>{
    supabase.from("mahasiswa").select("*")
    .then(res=>{
      // console.log(res.data)
      setDataMhs(res.data)
    })
  }, [refresh])

  return (
    <main className='w-screen min-h-screen'>
    
    <form className='w-[300px] h-auto p-4' onSubmit={handleSubmit}>
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

      <button className='p-2 bg-blue-500 mt-2 rounded-lg text-white'>SUBMIT</button>
    </form>

    <button className='p-2 bg-red-500 my-2' onClick={generateData} disabled={loading}>Generate Data</button>
    <table className='w-full'>
      <thead>
        <tr className='h-12 bg-slate-300'>
          <th className='p-2'>
            <label htmlFor="all">
              <input type="checkbox" id='all' onChange={handleSelectAll}/>
            </label>
          </th>
          <th className='p-2'>id</th>
          <th className='p-2'>Nama Mahasiswa</th>
          <th className='p-2'>Nim Mahasiswa</th>
          <th className='p-2'>Alamat</th>
          <th className='p-2'>No Telepon</th>
          <th className='p-2'>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          dataMhs.map((e)=>(
            <tr key={e.id}>
              <td className='p-2'>
                <label htmlFor={e.id}>
                  <input type="checkbox" id={e.id} checked={selectedRows.includes(e.id)}/>
                </label>
              </td>
              <td className='p-2'>{e.id}</td>
              <td className='p-2'>{e.nama}</td>
              <td className='p-2'>{e.nim}</td>
              <td className='p-2'>{e.alamat}</td>
              <td className='p-2'>{e.telepon}</td>
              <td className='p-2 flex gap-1'>
              <button className='p-2 bg-green-500'>Edit</button>
              <button className='p-1 bg-red-500' onClick={()=>{handleDelete(e.id, e.nama)}}>Delete</button>
              </td>   
            </tr>
          ))
        }
      </tbody>
    </table>


    </main>
  )
}

export default App