import "./NewRando.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { randosInputs } from "../../formSource";
import { List } from "@mui/material";
import axios from "axios"

const NewRando = () => {
  const [files, setFiles] = useState("");
  const [info,setInfo] = useState({})

  const handleChange = e =>
  {
    setInfo(prev => ({...prev,[e.target.id]:e.target.value}))
  }

  console.log(files)


  const handleClick = async (e) => {
    e.preventDefault()
    try 
    {
      const list = await Promise.all(Object.values(files).map(async file =>{
        const data = new FormData()
        data.append("file",file)
        data.append("upload_preset","upload")
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dfn9lin6b/image/upload",data)
        const {url} = uploadRes.data
        return url 
      }))

      const newRando = {
        ...info,photos:list,
      }

      await axios.post("/randos",newRando)
    }catch(err)
    {

    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Add New Rando</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {randosInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRando;
