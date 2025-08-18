import "./Profile.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useCurrentUser, useUpdateCurrentUser } from "../../hooks/useUsers";
import { useUpdateAuthUsername } from "../../hooks/useUpdateAuthUsername";

const schema = yup.object({
  username: yup
    .string()
    .min(1)
    .max(30)
    .matches(
      /^[a-z0-9_]+$/i,
      "Username must contain only letters, numbers, and underscores."
    )
    .optional(),
  password: yup.string().max(256).optional(),
});

function Profile() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const {
    mutate: updateUser,
    isLoading: updateLoading,
    isSuccess,
    isError,
    error,
  } = useUpdateCurrentUser();
  const [backendError, setBackendError] = useState(null);

  const updateAuthUsername = useUpdateAuthUsername();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({ username: user.username, password: "" });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    setBackendError(null);
    const payload = { ...data };
    if (!payload.password) {
      delete payload.password;
    }
    updateUser(
      payload,
      {
        onError: (err) => setBackendError(err?.message || "Update failed"),
        onSuccess: (updatedUser) => {
          if (payload.username) {
            updateAuthUsername(payload.username);
          }
        },
      }
    );
  };

  return (
    <div className="profile">
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="profile__title">Edit Profile</h2>
        {backendError && (
          <span className="profile__backend-error">{backendError}</span>
        )}
        {isSuccess && (
          <span className="profile__success">Profile updated!</span>
        )}
        <label className="profile__label">
          Username
          <input
            className="profile__input"
            type="text"
            {...register("username")}
            disabled={userLoading || updateLoading}
          />
          {errors.username && (
            <span className="profile__error">{errors.username.message}</span>
          )}
        </label>
        <label className="profile__label">
          Password
          <input
            className="profile__input"
            type="password"
            {...register("password")}
            disabled={userLoading || updateLoading}
          />
          {errors.password && (
            <span className="profile__error">{errors.password.message}</span>
          )}
        </label>
        <button
          className="profile__button"
          type="submit"
          disabled={userLoading || updateLoading}
        >
          {updateLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
