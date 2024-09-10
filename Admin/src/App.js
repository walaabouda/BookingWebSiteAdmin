import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import EditRando from "./pages/EditRandos/EditRandos"; // Assurez-vous d'importer votre composant EditRando
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, randosInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { randosColumns, reservationColumns, rondosColumns, userColumns } from "./datatablesource";
import NewRando from "./pages/NewRando/NewRando";
import NewRes from "./pages/NewRes/NewRes";
import EditUser from "./pages/EditUsers/EditUser";
import EditReservation from "./pages/EditReservations/EditReservations";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="users">
  <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
  <Route path="update/:userId" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
  <Route path="new" element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
</Route>

            <Route path="randos">
              <Route index element={<ProtectedRoute><List columns={randosColumns} /></ProtectedRoute>} />
              <Route path="update/:randoId" element={<ProtectedRoute><EditRando /></ProtectedRoute>} /> {/* Route définie ici */}
              <Route path="new" element={<ProtectedRoute><NewRando /></ProtectedRoute>} />
            </Route>
            // Route pour l'édition de réservation
<Route path="reservations">
  <Route index element={<ProtectedRoute><List columns={reservationColumns} /></ProtectedRoute>} />
  <Route path="new" element={<ProtectedRoute><NewRes /></ProtectedRoute>} />
  <Route path="update/:reservationId" element={<ProtectedRoute><EditReservation /></ProtectedRoute>} />
</Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
