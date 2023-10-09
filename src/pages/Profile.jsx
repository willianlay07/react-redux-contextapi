import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/account/accountSlice";

const Profile = () => {
  const account = useSelector((store) => store.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account.isAuthenticated) navigate("/");
  }, [account.isAuthenticated, navigate]);

  if (!account.isAuthenticated) return;

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <b>FullName: </b>
        {account.user.name}
      </p>
      <p>
        <b>Email: </b>
        {account.user.email}
      </p>
      <img src={`${account.user.avatar}`} />
      <br />
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
};

export default Profile;
