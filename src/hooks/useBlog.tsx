import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "@api/index";

interface BlogDetail {
  title: string;
  content: string;
}

const useBlog = () => {
  const [blogDetails, setBlogDetails] = useState<BlogDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogtDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/blog`);
      if (response.data.status === "success") {
        setBlogDetails(response.data.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      message.error(
        error?.response?.data.message || "Error fetching blog details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogtDetails();
  }, []);

  return { blogDetails, loading };
};

export default useBlog;


