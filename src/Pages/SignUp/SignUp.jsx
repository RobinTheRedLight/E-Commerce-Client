import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const [createdUserPhone, setCreatedUserPhone] = useState("");
  const [token] = useToken(createdUserPhone);
  const navigate = useNavigate();
  const location = useLocation();

  const form = location.state?.from?.pathname || "/";

  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    console.log(data);
    setSignUPError("");
    const telNum = data.tel;
    const extention = "@gmail.com";
    const resultData = telNum.concat(extention);
    console.log(resultData);
    createUser(resultData, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("User Created Successfully.");
        const userInfo = {
          displayTel: resultData,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(resultData);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  const saveUser = (tel) => {
    console.log(tel);
    const user = { tel };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserPhone(tel);
      });
  };

  return (
    <div className="h-[800px] flex justify-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
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
            {errors.tel && <p className="text-red-500">{errors.tel.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs">
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
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p className="pt-3">
          Already have an account?{" "}
          <Link className="link link-primary" to="/login">
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
