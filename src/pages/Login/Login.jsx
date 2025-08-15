import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useAuthMutation } from "../../hooks/useAuthMutation";

const schema = yup.object({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(1).max(256).required("Password is required"),
});

function Login() {
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useAuthMutation("login", {
    onError: (msg) => setBackendError(msg),
    onSuccess: () => {
      setBackendError(null);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // live validation
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login__title">Login</h2>
        {backendError && (
          <span className="login__backend-error">{backendError}</span>
        )}
        <label className="login__label">
          Username
          <input
            className="login__input"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <span className="login__error">{errors.username.message}</span>
          )}
        </label>
        <label className="login__label">
          Password
          <input
            className="login__input"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="login__error">{errors.password.message}</span>
          )}
        </label>
        <button className="login__button" type="submit">
          Log In
        </button>
        <button
          className="login__switch"
          type="button"
          onClick={() => navigate("/register")}
        >
          Need an account? Register
        </button>
      </form>
    </div>
  );
}

export default Login;
