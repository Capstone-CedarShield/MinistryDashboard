import React, { useState, useEffect } from "react";
import { signInWithEmail, sendCustomPasswordResetEmail } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/index";
import InputField from "../shared/input/InputField";
import Button from "../shared/button/Button";


function Login() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); // Clear any existing success message

    if (isResetPassword) {
      try {
        await sendCustomPasswordResetEmail(email);
        setSuccessMessage("Password reset email sent successfully!"); // Success message
        setIsResetPassword(false);
      } catch (error) {
        console.error("Error sending password reset email:", error);
        setErrorMessage("Failed to send password reset email. Please try again."); // User-friendly error
      }
    } else {
      try {
        await signInWithEmail(email, password);

        setSuccessMessage("Logged in successfully!"); 
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
          setErrorMessage("Incorrect credentials. Please try again.");
        } else {
          setErrorMessage("Login failed. Please try again.");
        }
      }
    }
  };



  const handleResetPasswordClick = () => {
    setIsResetPassword(true);
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/dashboard");
    }
  }, [userLoggedIn, navigate]);

  return (
    
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
    >   


      <h2 className="text-center text-2xl font-semibold text-black mb-6">
        {isResetPassword ? "Reset Password" : "Login"}
      </h2>


      <div className="mb-6">
        <InputField
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {!isResetPassword && (
        <>
          <div className="mb-6">
            <InputField
              type="text"
              id="privateKey"
              name="privateKey"
              placeholder="Private Key"
              required
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>

          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            showPasswordToggle={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}

      {!isResetPassword && (
        <div className="mb-6 text-right">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-red-500"
            onClick={handleResetPasswordClick}
          >
            Forgot your password?
          </button>
        </div>
      )}

      <Button
        type="submit"
        className="bg-red-500 text-white hover:bg-red-600"
      >
        {isResetPassword ? "Reset" : "Login"}
      </Button>

      {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </form>
  );
}

export default Login;
