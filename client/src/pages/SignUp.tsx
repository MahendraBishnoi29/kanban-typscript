import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPasswordErrText("");
    setConfirmPasswordErrText("");

    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirmPassword = (data.get("confirmPassword") as string).trim();

    let err = false;

    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("Please fill this field");
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErrText("Confirm password not match");
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.signup({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      toast.success("SignedUp Successfully");
      navigate("/");
    } catch (err: any) {
      console.log("SignUp Error" + err.message);
      // const errors = err?.data?.errors
      // errors?.forEach(e => {
      //   if (e.param === 'username') {
      //     setUsernameErrText(e.msg)
      //   }
      //   if (e.param === 'password') {
      //     setPasswordErrText(e.msg)
      //   }
      //   if (e.param === 'confirmPassword') {
      //     setConfirmPasswordErrText(e.msg)
      //   }
      // })
    }
    setLoading(false);
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setPasswordErrText("");
  //   setConfirmPasswordErrText("");

  //   const data = new FormData(e.target as HTMLFormElement);
  //   const username = (data.get("username") as string).trim();
  //   const password = (data.get("password") as string).trim();
  //   const confirmPassword = (data.get("confirmPassword") as string).trim();

  //   let err = false;

  //   if (username === "") {
  //     err = true;
  //     setUsernameErrText("Please fill this field");
  //   }
  //   if (password === "") {
  //     err = true;
  //     setPasswordErrText("Please fill this field");
  //   }
  //   if (confirmPassword === "") {
  //     err = true;
  //     setConfirmPasswordErrText("Please fill this field");
  //   }
  //   if (password !== confirmPassword) {
  //     err = true;
  //     setConfirmPasswordErrText("Confirm password not match");
  //   }

  //   if (err) return;

  //   setLoading(true);

  //   try {
  //     const result = await axios
  //       .post(`${baseURL}/auth/signup`, { username, password, confirmPassword })
  //       .then((res) => {
  //         localStorage.setItem("token", res.data?.token);
  //         setLoading(false);
  //         toast.success("SignUp Success 👍🏻, You can login now.");
  //         navigate("/");
  //       })
  //       .catch((error) => console.error(error.message));
  //     return result;
  //   } catch (err: any) {
  //     console.log(err.message);
  //     setLoading(false);
  //   }

  //   setLoading(false);
  // };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="false"
          disabled={loading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="false"
          disabled={loading}
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account? Login
      </Button>
    </>
  );
};

export default SignUp;
