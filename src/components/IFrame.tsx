import type { AMD_type_v2 } from "../types/airMonitoring";

const IFrame = ({ item }: { item: AMD_type_v2 }) => {
  console.log("DeviceUid:", item.device_uid);
  const url = `https://airnote.live/dev:${item.device_uid}/dashboard`;
  return (
    <div className="relative h-full">
      {/* <div className="absolute top-0 inset-x-0 h-[200px] bg-[#F5F5F5]">
        <p className="text-4xl font-bold text-center uppercase h-fit relative bg-red-300">
          Our Own Personal Name
        </p>
      </div> */}
      <iframe
        src={url}
        className="w-full h-full "
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="accelerometer; autoplay; encrypted-media; clipboard-write"
      ></iframe>
    </div>
  );
};

export default IFrame;
