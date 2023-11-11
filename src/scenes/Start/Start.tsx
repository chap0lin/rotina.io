import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <p>
      This is the start page. That means here is where all navigation begins.
    </p>
  );
}
