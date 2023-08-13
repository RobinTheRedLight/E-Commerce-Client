import { useEffect, useState } from "react";

const useToken = (phone) => {
  const [token, setToken] = useState("");
  console.log(phone);
  useEffect(() => {
    if (phone) {
      fetch(`http://localhost:5000/jwt?phone=${phone}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [phone]);
  return [token];
};

export default useToken;
