import React, { useState } from "react";
import { Form, MainDiv, Button  } from "./LoginSTylled";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

const Login = () => {
  const [gmail, setGmail] = useState("");
  const router = useRouter();

  type FormValues = {
    email: HTMLInputElement, password: HTMLInputElement,
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { email, password } = e.target as unknown as FormValues;

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        router.replace("/main")
  }).catch(() => alert("You email or password is incorrect"))
  }

  function handleGmail(e: React.ChangeEvent<HTMLInputElement>) {
    setGmail(e.target.value);
  }

  function goToSIgnUpPage() {
    router.push("/signup");
  }

  return (
    <MainDiv>
      <Form onSubmit={handleSubmit}>
        <h1>Log In</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={gmail}
            onChange={handleGmail}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          ></input>
        </div>

        <Button $secondry="" type="submit">Login</Button>
        <Button $secondry="secondry" onClick={goToSIgnUpPage}>
          Sign Up
        </Button>
      </Form>
    </MainDiv>
  );
};

export default Login;
