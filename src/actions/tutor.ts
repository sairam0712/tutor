"use server";

import db from "@/lib/db";

export async function getPastTutions(id: number) {
  try {
    const res = await db.proposal.findMany({
      where: {
        tutorId: id,
        status: "ACCEPTED",
      },
      include: {
        requirement: true,
      },
    });
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: [] };
  }
}

export type TPastTutions = Awaited<ReturnType<typeof getPastTutions>>;

export async function getRequirements(id: number) {
  try {
    const res = await db.requirement.findMany({
      where: {
        status: "PENDING",
        proposals: {
          none: {
            tutorId: id,
          },
        },
      },
      include: {
        _count: {
          select: {
            proposals: true,
          },
        },
      },
    });

    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: [] };
  }
}

export type TRequirements = Awaited<ReturnType<typeof getRequirements>>;

export async function applyForRequirement(
  requirementId: number,
  tutorId: number
) {
  try {
    const res = await db.proposal.create({
      data: {
        requirementId,
        tutorId,
      },
    });
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: null };
  }
}

export async function getAllPendingProposals(tutorId: number) {
  try {
    const res = await db.proposal.findMany({
      where: {
        tutorId,
        status: {
          not: "ACCEPTED",
        },
      },
      include: {
        requirement: true,
      },
    });
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: [] };
  }
}

export type TPendingProposals = Awaited<
  ReturnType<typeof getAllPendingProposals>
>;

export async function getTutor(id: number) {
  try {
    const res = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            proposals: {
              where: {
                status: "ACCEPTED",
              },
            },
          },
        },
        proposals: {
          where: {
            status: "ACCEPTED",
          },
          include: {
            requirement: true,
          },
        },
      },
    });
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: null };
  }
}
