import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useEffect } from "react";

//دي فايدتها عشان لو انا مش مسجل الدخول مينفعش ادخل  علي الاب
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return <div>{isAuthenticated ? children : null}</div>;
}

export default ProtectedRoute;
