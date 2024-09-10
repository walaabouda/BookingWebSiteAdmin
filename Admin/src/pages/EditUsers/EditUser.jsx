import "./EditUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userInputs } from "../../formSource";

const EditUser = () => {
    const { userId } = useParams();
    const [info, setInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/users/find/${userId}`);
          console.log("Data fetched: ", response.data);
          setInfo(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [userId]);
  
    const handleChange = (e) => {
      console.log(`Field ${e.target.id} changed to ${e.target.value}`);
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`/users/${userId}`, info);
        console.log("Data updated: ", info);
      } catch (err) {
        console.error("Error updating data:", err);
      }
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="edit">
        <Sidebar />
        <div className="editContainer">
          <Navbar />
          <div className="top">
            <h1>Edit User</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  info.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form onSubmit={handleUpdate}>
                {userInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={info[input.id] || ""}
                      className="customInput"
                    />
                  </div>
                ))}
                <button type="submit" className="customButton">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  

export default EditUser;
