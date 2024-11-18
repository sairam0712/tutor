import { getAllTutors } from "@/actions/student";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const tutors = await getAllTutors();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Tutors List
      </h1>
      {tutors.data.map((tutor) => (
        <Link
          href={`tutors/${tutor.id}`}
          key={tutor.id}
          className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">{tutor.name}</h2>
          <p className="text-gray-600">{tutor.proposals.length} proposals</p>
          <p className="text-gray-600">
            {tutor.email} - {tutor.phone}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Page;
