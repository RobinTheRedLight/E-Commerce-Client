import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserPhone, setLoginUserPhone] = useState("");
  const [token] = useToken(loginUserPhone);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    console.log(data);
    const telNum = data.tel;
    const extention = "@gmail.com";
    const resultData = telNum.concat(extention);
    setLoginError("");
    signIn(resultData, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserPhone(resultData);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div className="h-[800px] flex justify-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Phone number"
              {...register("tel", {
                required: true,
                minLength: 6,
                message: "Phone Number must be 6 characters or longer",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.tel && (
              <p className="text-red-600">{errors.tel?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs pb-8">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />

            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p className="pt-3">
          New to E-Commerce?{" "}
          <Link className="link link-primary" to="/signup">
            Create new Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
