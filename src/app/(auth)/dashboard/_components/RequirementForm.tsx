"use client";
import { useState } from "react";
import { toast } from "sonner";
import { createRequirement } from "@/actions/student";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const RequirementForm = () => {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  if (user.role !== "PARENT") {
    router.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Creating requirement...", {
        id: "requirement",
      });

      const requirement = await createRequirement(
        Number(user.id),
        subject,
        grade,
        description,
        address,
        amount,
        duration,
        phone,
        startDate
      );

      if (requirement.error) {
        toast.error(requirement.error, {
          id: "requirement",
        });
        return;
      }
      toast.success("Requirement created successfully!", {
        id: "requirement",
      });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        id: "requirement",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-xl font-semibold">Create Requirement</h2>

      <div>
        <label className="block text-gray-700">Subject</label>
        <Input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Grade</label>
        <Input
          type="text"
          placeholder="Enter grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Description</label>
        <Textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Address</label>
        <Input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Amount</label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Duration</label>
        <Input
          type="number"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Phone</label>
        <Input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-gray-700">Start Date</label>
        <Input
          type="date"
          onChange={(e) => setStartDate(new Date(e.target.value))}
          required
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
      >
        Create Requirement
      </Button>
    </form>
  );
};

export default RequirementForm;
