import "./Register.css";
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

function Register() {
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();
  const { mutate: registerUser, isLoading } = useAuthMutation("register", {
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
    console.log(data);
    registerUser(data);
  };
  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="register__title">Register</h2>
        {backendError && (
          <span className="register__backend-error">{backendError}</span>
        )}
        <label className="register__label">
          Username
          <input
            className="register__input"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <span className="register__error">{errors.username.message}</span>
          )}
        </label>
        <label className="register__label">
          Password
          <input
            className="register__input"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="register__error">{errors.password.message}</span>
          )}
        </label>
        {/* Email field removed */}
        <button className="register__button" type="submit">
          Register
        </button>
        <button
          className="register__switch"
          type="button"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default Register;
