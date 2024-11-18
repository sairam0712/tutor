"use client";

import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      toast.loading("Logging in...", {
        id: "login",
      });
      const user = await login(email, password);
      if (user.error) {
        toast.error(user.error, {
          id: "login",
        });
        return;
      }
      toast.success("Login successful!", {
        id: "login",
      });

      localStorage.setItem("user", JSON.stringify(user.data));
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        id: "login",
      });
    }
  };

  return (
    <div className="ax-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Sign-in into your Account</h2>
      
      {/* Social Login Buttons */}
      <div className="social-signup flex justify-between">
        <button className="flex items-center justify-center p-2 bg-white border border-gray-300 rounded w-1/2 ml-2">
          <img
            src="https://th.bing.com/th?q=Google+App+Icon+Wikipedia&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
            alt="Google logo"
            style={{ width: "17px"}}
          />
          Sign up with Google
        </button>
        <button className="flex items-center justify-center p-2 bg-white border border-gray-300 rounded w-1/2 ml-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple logo"
            style={{ width: "17px", marginRight: "10px" }}
          />
          Sign up with Apple
        </button>
      </div>

      <div className="or-divider">or</div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block mb-2">Your email</label>
        <Input
          type="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="block mb-2">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          type="submit"
          className="btn-create-account w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded transition duration-200"
        >
          Login
        </Button>
      </form>

      <center>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </center>
    </div>
  );
};

export default LoginForm;

// Add styles from HTML for layout and appearance
<style jsx>{`
  body {
    font-family: 'Open Sans', sans-serif;
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    
  }
    

  .signup-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  border-style: solid;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  margin: auto;
  border: 2px solid #333 !important; 
}
  .social-signup {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .or-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    color: #999;
  }

  .or-divider::before,
  .or-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #ccc;
  }

  .or-divider::before {
    margin-right: 10px;
  }

  .or-divider::after {
    margin-left: 10px;
  }

  .btn-create-account {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }

  .btn-create-account:hover {
    background-color: #0066cc;
  }

  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

`}</style>;
