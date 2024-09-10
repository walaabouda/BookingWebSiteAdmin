import "./EditRandos.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { randosInputs } from "../../formSource";

const EditRando = () => {
  const { randoId } = useParams(); // Obtenir l'ID de l'URL
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/randos/find/${randoId}`);
        console.log("Data fetched: ", response.data);
        const { data } = response;
        setInfo({
          ...data,
          startDate: new Date(data.startDate).toISOString().split('T')[0],
          endDate: new Date(data.endDate).toISOString().split('T')[0],
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [randoId]);
  
  const handleChange = (e) => {
    console.log(`Field ${e.target.id} changed to ${e.target.value}`); // Debug: Vérifiez les changements de champ
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/randos/${randoId}`, info);
      console.log("Data updated: ", info); // Debug: Vérifiez les données mises à jour
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("randosInputs:", randosInputs);

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <div className="top">
          <h1>Edit Rando</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                info.photos && info.photos.length > 0
                  ? info.photos[0]
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
  <form onSubmit={handleUpdate}>
    {randosInputs.map((input) => (
      <div className="formInput" key={input.id}>
        <label>{input.label}</label>
        {input.id === 'photos' ? (
          <div>
            {Array.isArray(info[input.id]) ? (
              info[input.id].map((photo, index) => (
                <img key={index} src={photo} alt={`Photo ${index}`} />
              ))
            ) : (
              <img src={info[input.id]} alt="Photo" />
            )}
          </div>
        ) : (
          <input
            id={input.id}
            onChange={handleChange}
            type={input.type}
            placeholder={input.placeholder}
            value={info[input.id] || ""}
            className="customInput"
          />
        )}
      </div>
    ))}
    <button type="submit" className="customButton">Update</button>
  </form>
</div>

        </div>
      </div>
    </div>
  );
                  }
  
export default EditRando;
