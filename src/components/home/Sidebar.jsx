import LaptopImage from "../../assets/LaptopImage.png";
import PhoneImage from "../../assets/PhoneImage.png";

function Sidebar() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white h-screen overflow-hidden">
      {/* Laptop Image */}
      <img
        src={LaptopImage}
        alt="Laptop"
        className="w-[80%] max-w-4xl"
      />

      {/* Phone Image */}
      <img
        src={PhoneImage}
        alt="Phone"
        className="absolute top-[20%] left-[10%] transform -translate-x-1/4 w-[25%] max-w-sm"
      />
    </div>
  );
}

export default Sidebar;

