import React, { useState } from 'react'
import axiosInstance from '../config/axiosConfig'
import { fileUpload } from '../../apis/userApis'

const FileUpload = () => {

  const [file,setFile] = useState(null)  
  const [username,setUsername] = useState("gokul")

  const handleupload = async (e) =>{
    e.preventDefault()
    console.log(file)

    const formData = new FormData()
    formData.append("username",username)
    formData.append("file",file)
    // upload logic 
    // axiosInstance.post("/upload",formData).then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // })
    const data = await fileUpload(formData)
  }

  return (
    <div>
      <div className='w-screen h-screen flex flex-col gap-40 justify-center items-center' >
        <h1 className=' text-4xl font-bold ' >FILE UPLOAD WITH MULTER</h1>
        <form onSubmit={handleupload} >
          <input className=' border outline-none px-3 py-2 ' onChange={(e)=> setFile(e.target.files[0])}  type="file" name='' id='' />
          <button className= ' border bg-amber-200 px-3 py-2 ' >Upload</button>
        </form>
      </div>
    </div>
  )
}

export default FileUpload