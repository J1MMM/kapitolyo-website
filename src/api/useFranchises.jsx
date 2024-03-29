import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import franchiseHelper from "../components/common/data/franchiseHelper";

const useFranchises = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const { franchises, setFranchises, franchisesLoading, setFranchisesLoading } =
    useData();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFranchises = async () => {
      setFranchisesLoading(true);
      console.log("get franchises");
      try {
        const response = await axiosPrivate.get("/franchise");
        console.log(response.data.rows);
        setFranchises(() => {
          return response.data?.rows.map((data) => {
            return franchiseHelper.createClientsData(
              data._id || "",
              data.MTOP || "",
              data.LASTNAME || "",
              data.FIRSTNAME || "",
              data.MI || "",
              data.ADDRESS || "",
              data.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.DRIVERS_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.TODA || "",
              data.DRIVERS_NAME || "",
              data.DRIVERS_ADDRESS || "",
              data.OR || "",
              data.CR || "",
              data.DRIVERS_LICENSE_NO || "",
              data.MODEL || "",
              data.MOTOR_NO || "",
              data.CHASSIS_NO || "",
              data.PLATE_NO || "",
              data.STROKE || "",
              data.DATE_RENEWAL && new Date(data.DATE_RENEWAL),
              data.REMARKS || "",
              data.DATE_RELEASE_OF_ST_TP &&
                new Date(data.DATE_RELEASE_OF_ST_TP),
              data.COMPLAINT || "",
              data.DATE_ARCHIVED || "",
              data.OWNER_SEX || "",
              data.DRIVERS_SEX || "",
              data.TPL_PROVIDER || "",
              data.TPL_DATE_1 && new Date(data.TPL_DATE_1),
              data.TPL_DATE_2 && new Date(data.TPL_DATE_2),
              data.FUEL_DISP || "",
              data.TYPE_OF_FRANCHISE || "",
              data.KIND_OF_BUSINESS || "",
              data.ROUTE || ""
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
