import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>404 | Page not found!</p>

      <button onClick={() => navigate(-2)}>Go to Home</button>
    </div>
  );
};

export default NotFound;
