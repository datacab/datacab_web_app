import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useRequestData = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSuccessMessage(null);

    const requestBody = {
      to: "support@maji.org.ng",
      ...formData,
    };

    try {
      const response = await axios.post(
        "https://datacab-server-8x13.onrender.com/air-monitoring/request-data",
        requestBody
      );
      if (response.status === 201 || response.data.status === "success") {
        message.success(response.data.message || "Email sent successfully!");
        setSuccess(true);
        setSuccessMessage(response.data.message || "Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          organization: "",
          message: "",
        });

        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred while sending the request.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
    successMessage,
  };
};

export default useRequestData;
