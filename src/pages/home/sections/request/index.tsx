import PrimaryBtn from "@components/button";
import useRequestData from "@hooks/useRequestData";

const RequestData = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
    successMessage,
  } = useRequestData();

  // Function to check if all fields are filled
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.organization.trim() !== "" &&
      formData.message.trim() !== ""
    );
  };

  return (
    <div className="bg-brandLightBlue p-[16px] lg:p-[32px] rounded-[10px]">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-40">
        <div className="flex flex-col gap-[12px] lg:gap-[24px] lg:w-[50%]">
          <h2
            style={{
              fontFamily: "Merriweather",
              fontWeight: 700,
            }}
            className="text-[20px] lg:text-[32px] lg:leading-[38px]"
          >
            Request Data
          </h2>
          <h3 className="text-[16px] lg:text-[18px] font-[500] lg:leading-[28px]">
            Need specific data or have questions about our data collection
            efforts? We're here to help! Fill out the form to request data from
            a particular location or learn more about how DataCab can support
            your projects. Our team will get back to you promptly with the
            information.
          </h3>
        </div>

        <div className="lg:w-[50%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[10px] lg:gap-[20px]"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[14px]">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-[8px] outline-none text-[14px] bg-white"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-[8px] outline-none text-[14px] bg-white"
                placeholder="Enter your email address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="organization" className="text-[14px]">
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-4 rounded-[8px] outline-none text-[14px]"
                placeholder="Enter your organization name "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[14px]">
                What do you want to do?
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                cols={10}
                rows={8}
                className="rounded-[8px] p-4 outline-none text-[14px] bg-white"
              ></textarea>
            </div>
            {error && (
              <p className="text-red-500 text-[16px] font-bold text-center">
                {error || "Request Not Sent!"}
              </p>
            )}
            
            {success ||
              (successMessage && (
                <p className="text-green-500 text-[16px] font-bold text-center">
                  {successMessage || "Email sent successfully"}
                </p>
              ))}

            {/* Display success message for 5 seconds */}
            {/* {successMessage && (
              <p className="text-green-500 text-[16px] font-bold text-center">
                {successMessage}
              </p>
            )} */}

            {/* Button with conditional disabled styling */}
            <PrimaryBtn
              className={`bg-primaryColor h-[38px] lg:h-[48px] flex justify-center items-center text-brandWhite mt-4 ${
                loading || !isFormValid()
                  ? "bg-gray-400 cursor-not-allowed" // Disabled styles
                  : ""
              }`}
              disabled={loading || !isFormValid()} // Disables button based on form validity
            >
              {loading ? "Submitting..." : "Request Data"}
            </PrimaryBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestData;
