import { getSpecificRequirement } from "@/actions/student";
import Link from "next/link";
import React from "react";
import ApproveButton from "./_components/ApproveButton";

const Page = async ({ params }: { params: { id: string } }) => {
  const [reqId, userId] = params.id.split("-");
  const requirements = await getSpecificRequirement(
    parseInt(reqId),
    parseInt(userId)
  );

  if (requirements.data?.status === "ACCEPTED") {
    return (
      <h1 className="text-3xl font-bold text-center">
        Requirement already full filled so cant view this page again (go and
        check your previous tutions page)
      </h1>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center">Requirements</h2>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{requirements.data?.subject}</h3>
        <p className="text-gray-700">Grade: {requirements.data?.grade}</p>
        <p className="text-gray-700">Amount: {requirements.data?.amount}</p>
        <p className="text-gray-700">Duration: {requirements.data?.duration}</p>
        <p className="text-gray-700">
          Start Date: {requirements.data?.startDate.toISOString()}
        </p>
        <p className="text-gray-700">
          Proposals: {requirements.data?._count?.proposals}
        </p>
      </div>
      <h2 className="text-3xl font-bold text-center">Proposals</h2>
      <div className="space-y-4">
        {requirements.data?.proposals.map((proposal) => (
          <Link
            href={`/tutors/${proposal.tutorId}`}
            key={proposal.id}
            className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <h4 className="text-xl font-semibold">{proposal.tutor.name}</h4>
            <p className="text-gray-600">Phone: {proposal.tutor.phone}</p>
            <p className="text-gray-600">Email: {proposal.tutor.email}</p>
            <ApproveButton proposalId={proposal.id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
