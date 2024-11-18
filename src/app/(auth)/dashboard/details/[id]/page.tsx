import { getSpecificTution } from "@/actions/student";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const [tutId, userId] = params.id.split("-");
  const tution = await getSpecificTution(parseInt(tutId));

  const acceptedProposal = tution.data?.proposals.find(
    (proposal) => proposal.status === "ACCEPTED"
  );
  const rejectedProposals = tution.data?.proposals.filter(
    (proposal) => proposal.status === "REJECTED"
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Tuition Details</h1>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{tution.data?.subject}</h3>
        <p className="text-gray-700">Grade: {tution.data?.grade}</p>
        <p className="text-gray-700">Amount: {tution.data?.amount}</p>
        <p className="text-gray-700">Duration: {tution.data?.duration}</p>
        <p className="text-gray-700">
          Start Date: {tution.data?.startDate.toISOString()}
        </p>
        <p className="text-gray-700">
          Total Proposals: {tution.data?._count.proposals}
        </p>
      </div>

      {/* Tutor Details */}
      <h2 className="text-2xl font-bold">Tutor Details</h2>
      {acceptedProposal ? (
        <Link
          href={`/tutors/${acceptedProposal.tutorId}`}
          className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <h3 className="text-xl font-semibold">
            {acceptedProposal.tutor.name}
          </h3>
          <p className="text-gray-600">Phone: {acceptedProposal.tutor.phone}</p>
          <p className="text-gray-600">Email: {acceptedProposal.tutor.email}</p>
        </Link>
      ) : (
        <p className="text-gray-500">No accepted tutor found.</p>
      )}

      {/* Proposals */}
      <h2 className="text-2xl font-bold">Rejected Proposals</h2>
      <div className="space-y-4">
        {rejectedProposals && rejectedProposals.length > 0 ? (
          rejectedProposals.map((proposal) => (
            <Link
              href={`/tutors/${proposal.tutorId}`}
              key={proposal.id}
              className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold">{proposal.tutor.name}</h3>
              <p className="text-gray-600">Phone: {proposal.tutor.phone}</p>
              <p className="text-gray-600">Email: {proposal.tutor.email}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No rejected proposals found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
