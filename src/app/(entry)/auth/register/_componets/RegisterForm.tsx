"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Role } from "@prisma/client";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>(Role.PARENT); // Default role
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Ivalid Number.");
      return;
    }

    try {
      toast.loading("Registering...", {
        id: "register",
      });
      const user = await register(email, password, phone, name, role);
      if (user.error) {
        toast.error(user.error);
      } else {
        toast.success("Registration successful!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    } finally {
      toast.dismiss("register");
    }
  };

  return (
    
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-[#FFF4EA] rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={Role.PARENT}>Parent</option>
        <option value={Role.TUTOR}>Tutor</option>
      </select>
      <Button
        type="submit"
        className="w-full bg-[#C96868] text-white hover:bg-[#B05757] transition duration-200"
      >
        Register
      </Button>
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
