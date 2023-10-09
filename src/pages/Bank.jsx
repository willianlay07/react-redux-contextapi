import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountOperations from "../components/AccountOperations";

const Bank = () => {
  const account = useSelector((store) => store.account);
  const navigate = useNavigate();

  useEffect(() => {
    if (!account.isAuthenticated) navigate("/");
  }, [account.isAuthenticated, navigate]);

  if (!account.isAuthenticated) return;

  return (
    <div>
      <h1>Welcome {account.user.name}</h1>
      <div className="balance">{formatCurrency(account.balance)}</div>
      <AccountOperations />
    </div>
  );
};

export default Bank;

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
