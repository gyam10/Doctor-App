import { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../data/constant";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const BookAppointment = () => {
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.user);
  // fetching data
  const getUserData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}doctor/getDoctorById`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // available check
  const handleAvailable = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${BASE_URL}user/book-available`,
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setIsAvailable(true);
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error("Something went wrong.");
      console.log(err);
    }
  };

  // Booking
  const handleBooking = async () => {
    // console.log("here", date, time);
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date and Time Required.");
      }
      dispatch(showLoading());
      const response = await axios.post(
        `${BASE_URL}user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setDoctor(response.data.data);
        message.success(response.data.msg);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Layout>
        <h1>Booking Page</h1>
        <div className="container m-2">
          {doctor && (
            <div>
              <h3>
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              <h4>Fees: {doctor.feesPerConsultation}</h4>
              <h4>
                Timings: {doctor.timings[0]} - {doctor.timings[1]}
              </h4>
              <div className="d-flex flex-column w-50">
                <DatePicker
                  aria-required={"true"}
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value.$d).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  aria-required={"true"}
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime(moment(value.$d).format("HH:mm"));
                  }}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAvailable}
                >
                  Check Availability
                </button>
                {!isAvailable && (
                  <button className="btn btn-dark mt-2" onClick={handleBooking}>
                    Book Now
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};
export default BookAppointment;
