// EditReservations.jsx
import "./EditReservations.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { rservationInputs } from "../../formSource"; // Assurez-vous que le nom est correct

const EditReservation = () => {
    const { reservationId } = useParams();
    const [info, setInfo] = useState({}); // Initialisez info avec les bonnes valeurs
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/reservations/find/${reservationId}`);
        console.log("Data fetched: ", response.data);
        const { data } = response;
        setInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch reservation data. Please try again later.");
      }
    };
  
    fetchData();
  }, [reservationId]);

  // Vérifiez que l'ID de la réservation est correct
  if (!reservationId) {
    return <div>Invalid reservation ID.</div>;
  }

  const handleChange = (e) => {
    console.log(`Field ${e.target.id} changed to ${e.target.value}`);
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/reservations/${reservationId}`, info);
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
        <div className="top">
          <h1>Edit Reservation</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleUpdate}>
              {rservationInputs.map((input) => (
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

export default EditReservation;
