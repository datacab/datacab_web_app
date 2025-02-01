const donorsList = [
  {
    name: "Association For Progressive Communications",
    icon: "/dn1.jpg",
  },
  {
    name: "Collaborative Media Advocacy Platform ",
    icon: "/dn2.jpg",
  },
  {
    name: "Environmental Rights Action",
    icon: "/dn3.png",
  },
  {
    name: "French Embassy in Nigeria",
    icon: "/dn4.jpg",
  },
  {
    name: "Global Green Grants Funds",
    icon: "/dn5.jpg",
  },
  {
    name: "Home Of Mother Earth Foundation",
    icon: "/dn6.jpg",
  },
  {
    name: "Leighday and Co Solicitors UK",
    icon: "/dn7.jpg",
  },
  {
    name: "Lush Charity",
    icon: "/dn8.jpg",
  },
  {
    name: "Meliore Foundation logo",
    icon: "/dn9.jpg",
  },
  {
    name: "Mozilla Foundation ",
    icon: "/dn10.webp",
  },
  {
    name: "National Democratic Institute",
    icon: "/dn11.png",
  },
  {
    name: "National Endownment for Democracy",
    icon: "/dn12.png",
  },
  {
    name: "Open Culture Foundation",
    icon: "/dn13.png",
  },
  {
    name: "New Media Advocacy Project",
    icon: "/dn14.png",
  },
  {
    name: "Stakeholder Democracy Network",
    icon: "/dn15.png",
  },
  {
    name: "United States Consulate General Lagos",
    icon: "/dn16.png",
  },
];

const Donors = () => {
  return (
    <div className="py-[40px] lg:py-[80px]">
      <div className="flex flex-col gap-[18px] lg:gap-[20px]">
        <h2
          style={{
            // fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px] lg:leading-[38px] text-center font-arialBlack"
        >
          Our Donors
        </h2>

        <div className="flex flex-wrap justify-center items-start gap-[20px] lg:gap-[40px] lg:mt-[20px]">
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
