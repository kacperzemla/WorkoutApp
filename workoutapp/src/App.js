import "./Reusable/FontawesomeIcons";
import Navbar from "./Navbar";
import Register from "./Register";
import "./Styles/global.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Plans from "./Plans";
import StartTraining from "./StartTraining";
import CreatePlan from "./CreatePlan";
import AuthContext from "./Contexts/AuthContext";
import { useContext } from "react";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import CreateWorkout from "./CreateWorkout";
import { PlanProvider } from "./Contexts/PlanContext";
import { WorkoutProvider } from "./Contexts/WorkoutContext";
import PlanDetails from "./PlanDetails";
import WorkoutDetails from "./WorkoutDetails";
import Diet from "./Diet";
import Home from "./Home";
import ChooseWorkoutFromPlan from "./ChooseWorkoutFromPlan";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:id" element={<PlanDetails />} />
          <Route path ="/workouts/:id" element={<WorkoutDetails />} />
          <Route path="/startTraining" element={<StartTraining />} />
          <Route path="/diet" element={<Diet />} />

          <Route
            path="/createWorkoutFromPlan"
            element={
              <WorkoutProvider>
                <ChooseWorkoutFromPlan />
              </WorkoutProvider>
            }
          />

          <Route
            path="/createPlan"
            element={
              <PlanProvider>
                <CreatePlan />
              </PlanProvider>
            }
          />

          <Route
            path="/createWorkout"
            element={
              <WorkoutProvider>
                <CreateWorkout />
              </WorkoutProvider>
            }
          />
        </Route>
        <Route path="/login" element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          path="/register"
          element={auth ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      {auth && <Navbar />}
    </div>
  );
}

export default App;
