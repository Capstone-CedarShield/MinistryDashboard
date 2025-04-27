import SettingsOption from "./SettingOption";

function SettingsInformation({ icon, text, id, index, totalItems }) {
  const isLastItem = index === totalItems - 1; // Check if it's the last item

  return (
    <div
      className={`flex items-center justify-between py-5 mx-6 ${
        isLastItem ? "" : "border-b border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-4">
        <img src={icon} alt="icon" className="w-8 h-8 text-gray-600" />
        <p className="text-lg text-gray-700">{text}</p>
      </div>
      <SettingsOption id={id} />
    </div>
  );
}

export default SettingsInformation;
