const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  nationalId: "G300303",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialStateAccount = {
  user: null,
  isAuthenticated: false,
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "acount/logout":
      return initialStateAccount;

    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

export function login(email, password) {
  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    return {
      type: "account/login",
      payload: FAKE_USER,
    };
  }
}

export function logout() {
  return {
    type: "acount/logout",
  };
}

export function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
