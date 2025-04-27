const getSeverityColor = (severity) => {
  switch (severity.toLowerCase()) {
    case "urgent":
      return "#C53030";
    case "moderate":
      return "#E29C10";
    case "low":
      return "#5DC100";
    default:
      return "#000000";
  }
};

export { getSeverityColor };
