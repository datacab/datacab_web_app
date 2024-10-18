const donorsList = [
  {
    name: "Association For Progressive Communications",
    icon: "/donor.svg", 
  },
  {
    name: "French Embassy In Nigeria",
    icon: "/french.svg",
  },
  {
    name: "United State Consulate Lagos",
    icon: "/usa.svg",
  },
  {
    name: "Global Green Grants Fund",
    icon: "/green.svg",
  },
  {
    name: "Open Culture Foundation",
    icon: "/culture.svg",
  },
  {
    name: "National Democratic Institute",
    icon: "/demo.svg",
  },
];

const Donors = () => {
  return (
    <div className="py-[40px] lg:py-[80px]">
      <div className="flex flex-col gap-[18px] lg:gap-[20px]">
        <h2
          style={{
            fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px] lg:leading-[38px] text-center"
        >
          Our Donors
        </h2>

        <div className="flex flex-wrap justify-center items-start gap-[20px] lg:gap-[40px]">
          {donorsList.map((donor, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <img src={donor.icon} alt={donor.name} className=" h-[50px]" />
              <p className="text-[14px] font-[600] lg:w-[190px] text-center">
                {donor.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donors;
