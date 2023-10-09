import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/account/accountSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const account = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleForm(e) {
    e.preventDefault();

    if (!email || !password) return;
    dispatch(login(email, password));

    navigate("/auth/profile", {
      replace: true,
    });
  }

  useEffect(() => {
    if (account.isAuthenticated)
      navigate("/auth/profile", {
        replace: true,
      });
  }, [account.isAuthenticated, navigate]);

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleForm}>
        <label>Email: </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label>Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
