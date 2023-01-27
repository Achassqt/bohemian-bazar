import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Validation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="validation-content">
      <div className="ok">OK</div>
    </div>
  );
}

export default Validation;
