import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TokenHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    console.log("Token from URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored successfully:", token);
      navigate("/profile"); // redirect to profile after storing token
    } else {
      console.warn("No token found in URL");
      //window.location.href = "http://localhost:8080/HubzoneCareer"; // back to login
    }
  }, []);

  return <div>Processing login...</div>;
}
