import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { MainDiv,Form,Button } from "./SignUpStylled";
import { useRouter } from "next/router";

function SignUp() {
  const router = useRouter();

  type FormValues = {
    email: HTMLInputElement, password: HTMLInputElement,
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = e.target as unknown as FormValues;

    // Firebase Database
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => router.push("/login"));
  }

  function goToLogInPage() {
    router.push("/login");
  }

  return (
    <div>
      <MainDiv>
        <Form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          <div>
            <label htmlFor="email">Email</label>
            <input
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
          <Button $secondry="" type="submit">Sign Up</Button>
          <Button $secondry="secondry" onClick={goToLogInPage}>
            Login
          </Button>
        </Form>
      </MainDiv>
    </div>
  );
}

export default SignUp;
