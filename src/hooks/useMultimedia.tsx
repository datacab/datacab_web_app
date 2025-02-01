import { useState, useEffect, Key } from "react";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "@api/index";

interface MultimediaDetail {
  id: Key | null | undefined;
  media: string | undefined;
  title: string;
  content: string;
}

const useMultimedia = () => {
  const [multimediaDetails, setMultimediaDetails] = useState<
    MultimediaDetail[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchMultimediaDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/multimedia`);
      if (response.data.status === "success") {
        setMultimediaDetails(response.data.data.reverse());
      }
      // console.log("fetchMultimediaDetails", response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(
        error?.response?.data.message || "Error fetching multimedia details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultimediaDetails();
  }, []);

  return { multimediaDetails, loading };
};

export default useMultimedia;


