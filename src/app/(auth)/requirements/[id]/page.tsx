import db from "@/lib/db";
import Apply from "./_components/Apply";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const requirement = await db.requirement.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      _count: {
        select: {
          proposals: true,
        },
      },
      proposals: {
        include: {
          tutor: true,
        },
      },
    },
  });

  if (!requirement) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Requirement not found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        {requirement.subject}
      </h1>
      <p className="text-gray-700">{requirement.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-700">
          <strong>Duration:</strong> {requirement.duration}
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> {requirement.address}
        </p>
        <p className="text-gray-700">
          <strong>Amount:</strong> ${requirement.amount}
        </p>
        <p className="text-gray-700">
          <strong>Grade:</strong> {requirement.grade}
        </p>
      </div>
      <p className="text-gray-700">
        <strong>Total Proposals:</strong> {requirement._count?.proposals}
      </p>
      <Apply id={requirement.id} />

      <h2 className="text-2xl font-semibold text-gray-800">Proposals</h2>
      <ul className="space-y-2">
        {requirement.proposals.map((proposal) => (
          <li
            key={proposal.id}
            className="p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <Link
              href={`/tutors/${proposal.tutorId}`}
              className="text-blue-600 hover:underline"
            >
              {proposal.tutor.name} -{" "}
              <span className="text-gray-500">{proposal.tutor.email}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
