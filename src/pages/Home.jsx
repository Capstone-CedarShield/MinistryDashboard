import Navbar from "../components/home/Navbar";
import Sidebar from "../components/home/Sidebar";
import LoginForm from "../components/home/LoginForm";
import { useState } from "react";

function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleHomeClick = () => {
    setShowLogin(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <Navbar onLoginClick={handleLoginClick} onHomeClick={handleHomeClick} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-7/12 bg-gray-100 relative">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-10">
          {!showLogin ? (
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-relaxed">
                Real-Time Emergency <br />
                Solutions at Your <br />
                Fingertips
              </h1>
            </div>
          ) : (
            <div className="w-full max-w-lg">
              <LoginForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
