const MapHighlights = () => {
  return (
    <div className="pb-[40px] lg:py-[40px]">
      <div className="flex flex-col gap-[8px] justify-center items-center">
        <h2
          style={{
            fontFamily: "Merriweather",
            fontWeight: 700,
          }}
          className="text-[20px] lg:text-[32px] lg:w-[379px] lg:leading-[38px] text-center"
        >
          Map Highlights
        </h2>
        <h3 className="text-[16px] lg:text-[18px] font-[500] lg:w-[980px] lg:leading-[28px] text-center">
          Location highlight of where DataCab has collected data and set up
          devices for data collection. Stay informed about our efforts across
          various regions as we continue to gather insights and expand our
          network.
        </h3>

        <div className="w-full mt-[12px]">
          <iframe
            width="100%"
            height="600"
            style={{
              border: "none", // Replaces frameBorder
              overflow: "hidden", // Replaces scrolling="no"
              margin: 0, // Replaces marginHeight and marginWidth
            }}
            allowFullScreen
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Obasanjo%20Hilltop,%20Abeokuta+(Map%20Highlights)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps devices</a>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default MapHighlights;
