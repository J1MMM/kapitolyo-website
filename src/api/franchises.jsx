import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import helper from "./helper";

const useFranchises = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const { franchises, setFranchises, franchisesLoading, setFranchisesLoading } =
    useData();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFranchises = async () => {
      console.log("get franchises");
      try {
        const response = await axiosPrivate.get("/franchise");
        console.log(response.data.rows);
        setFranchises(() => {
          return response.data?.rows.map((data) => {
            return helper.createClientsData(
              data._id,
              data.MTOP,
              data.LASTNAME,
              data.FIRSTNAME,
              data.MI,
              data.ADDRESS,
              data.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.DRIVER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.TODA,
              data.DRIVERS_NAME,
              data.DRIVERS_ADDRESS,
              data.OR,
              data.CR,
              data.DRIVERS_LICENSE_NO,
              data.MODEL,
              data.MOTOR_NO,
              data.CHASSIS_NO,
              data.PLATE_NO,
              data.STROKE,
              data.DATE_RENEWAL && new Date(data.DATE_RENEWAL),
              data.REMARKS,
              data.DATE_RELEASE_OF_ST_TP &&
                new Date(data.DATE_RELEASE_OF_ST_TP),
              data.COMPLAINT,
              data.DATE_ARCHIVED,
              data.OWNER_SEX,
              data.DRIVERS_SEX
            );
          });
        });
      } catch (error) {
        setError(error);
      } finally {
        setFranchisesLoading(false);
      }
    };

    fetchFranchises();
  }, [axiosPrivate]); // Ensure axiosPrivate is included as a dependency

  return { franchises, franchisesLoading, error };
};

export default useFranchises;
