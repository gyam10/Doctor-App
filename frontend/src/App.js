import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import { useSelector } from "react-redux";
import Spinner from "./components/loading.component";
import ProtectedRoute from "./components/projected.route.component";
import PublicRoute from "./components/public.route.component";
import ApplyDoctor from "./pages/applyDoctor.pages";
import NotificationPage from "./pages/notification.page";
import Users from "./pages/admin/user";
import Doctors from "./pages/admin/doctor";
import Profile from "./pages/doctor/profile";
import BookAppointment from "./pages/appointment.page";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctor"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
