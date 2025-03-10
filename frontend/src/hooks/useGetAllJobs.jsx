import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      //api call
      const res = await axios.get(`${JOB_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGetAllJobs;
