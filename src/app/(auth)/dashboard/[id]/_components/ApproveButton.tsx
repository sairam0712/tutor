"use client";

import { approveProposal } from "@/actions/student";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ApproveButton = ({ proposalId }: { proposalId: number }) => {
  const router = useRouter();
  const accept = async () => {
    try {
      toast.loading("Approving...", {
        id: "approve",
      });
      const res = await approveProposal(Number(proposalId));
      if (res.error) {
        toast.error(res.error, {
          id: "approve",
        });
        return;
      }

      toast.success("Proposal approved", {
        id: "approve",
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        id: "approve",
      });
    }
  };

  return (
    <Button
      onClick={accept}
      className="mt-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
    >
      Approve
    </Button>
  );
};

export default ApproveButton;
