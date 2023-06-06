import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { BASE_URL } from "../data/constant";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // console.log(user);

  // getting the user
  const getUser = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        `${BASE_URL}user/getUserData`,
        { token: localStorage.getItem("access_token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (err) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("access_token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
