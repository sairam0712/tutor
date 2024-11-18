"use client";
import { applyForRequirement } from "@/actions/tutor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Apply = ({ id }: { id: number }) => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user) {
    router.push("/login");
  }
  const apply = async () => {
    try {
      const data = await applyForRequirement(Number(id), Number(user.id));
      if (data.error) {
        toast.error(data.error, {
          id: "apply-requirement",
        });
        return;
      }
      toast.success("Applied to requirement", {
        id: "apply-requirement",
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error applying to requirement", {
        id: "apply-requirement",
      });
    }
  };
  return <Button onClick={apply}>Apply</Button>;
};

export default Apply;
