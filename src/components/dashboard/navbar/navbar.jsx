import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isIncidentUrl = /^\/dashboard\/incident\/\w+/i.test(location.pathname);
  const isOrganizationUrl = /^\/dashboard\/organization\/\w+/i.test(location.pathname);

  let backButton = null;

  if (isIncidentUrl) {
    backButton = (
      <Link
        to="/dashboard/incident"
        className="text-gray-500 text-sm font-medium hover:text-gray-800"
      >
        &lt; Incidents
      </Link>
    );
  } else if (isOrganizationUrl) {
    backButton = (
      <Link
        to="/dashboard/organization"
        className="text-gray-500 text-sm font-medium hover:text-gray-800"
      >
        &lt; Organization
      </Link>
    );
  }

  return (
    <div className="w-full bg-white py-5 px-4 flex items-center border-b border-gray-300">
      {/* Back Button or Placeholder */}
      <div className="flex-1">
        {backButton}
      </div>

      {/* CedarShield Logo */}
      <div className="text-red-600 text-base font-bold">
        Cedar<span className="text-black">Shield</span>
      </div>
    </div>
  );
}

export default Navbar;
