import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import { da } from "date-fns/locale";
import helper from "../components/common/data/helper";

const useViolations = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const {
    violationsListLoading,
    setViolationsListLoading,
    violationsList,
    setViolationsList,
    setViolationsLoading,
    setViolations,
  } = useData();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setViolationsLoading(true);
      try {
        const response = await axiosPrivate.get("/violation");
        console.log(response.data);
        setViolations(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setViolationsLoading(false);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  useEffect(() => {
    const fetchData = async () => {
      setViolationsListLoading(true);
      try {
        const response = await axiosPrivate.get("/violation/list");

        setViolationsList(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setViolationsListLoading(false);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  return { violationsList, violationsListLoading, error };
};

export default useViolations;
