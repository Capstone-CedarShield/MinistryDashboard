function Information({ icon, text, index, totalItems }) {
  const isLastItem = index === totalItems - 1; // Check if it's the last item

  return (
    <div
      className={`flex items-center space-x-4 py-6 mx-6 ${
        isLastItem ? "" : "border-b border-gray-300"
      }`}
    >
      <div className="text-gray-600">
        <img src={icon} alt="icon" className="w-8 h-8" />
      </div>
      <p className="text-lg text-gray-700">{text}</p>
    </div>
  );
}

export default Information;
