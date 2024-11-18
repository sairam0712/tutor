import { getTutor } from "@/actions/tutor";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const tutor = await getTutor(Number(params.id));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-3">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {tutor.data?.name}
      </h1>
      <p className="text-gray-700 text-center">{tutor.data?.email}</p>
      <p className="text-gray-700 text-center">{tutor.data?.phone}</p>
      <p className="text-gray-700 text-center">
        <strong>{tutor.data?._count?.proposals} tutions</strong>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        Previous Tutions
      </h2>
      {tutor.data && tutor.data?.proposals.length > 0 ? (
        tutor.data.proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200 mb-4"
          >
            <h3 className="text-xl font-semibold">
              {proposal.requirement.subject}
            </h3>
            <p className="text-gray-700">
              <strong>Grade:</strong> {proposal.requirement.grade}
            </p>
            <p className="text-gray-700">
              <strong>Duration:</strong> {proposal.requirement.duration}
            </p>
            <p className="text-gray-700">
              <strong>Amount:</strong> ${proposal.requirement.amount}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {proposal.requirement.description}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No previous tutions found.</p>
      )}
    </div>
  );
};

export default Page;
