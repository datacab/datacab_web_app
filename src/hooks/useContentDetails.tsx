import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "@api/index";

interface ContentDetail {
  title: string;
  content: string;
}

const useContentDetails = () => {
  const [contentDetails, setContentDetails] = useState<ContentDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContentDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/web-content`);
      if (response.data.status === "success") {
        setContentDetails(response.data.data);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(
        error?.response?.data.message || "Error fetching content details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentDetails();
  }, []);

  return { contentDetails, loading };
};

export default useContentDetails;
