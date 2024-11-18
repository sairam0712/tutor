"use server";
import db from "@/lib/db";

export async function getPastRequirements(id: number) {
  try {
    const requirements = await db.requirement.findMany({
      where: {
        studentId: id,
        status: "PENDING",
      },
      include: {
        _count: {
          select: {
            proposals: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return { error: null, data: requirements };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: null };
  }
}

export type TPastRequirements = Awaited<ReturnType<typeof getPastRequirements>>;

export async function getPastTuitions(id: number) {
  try {
    const tuitions = await db.requirement.findMany({
      where: {
        studentId: id,
        status: "ACCEPTED",
      },
      include: {
        _count: {
          select: {
            proposals: true,
          },
        },
        proposals: {
          where: {
            status: "ACCEPTED",
          },
          select: {
            tutor: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return { error: null, data: tuitions };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: null };
  }
}

export type TPastTuitions = Awaited<ReturnType<typeof getPastTuitions>>;

export async function createRequirement(
  id: number,
  subject: string,
  grade: string,
  description: string,
  address: string,
  amount: number,
  duration: number,
  phone: string,
  startDate: Date
) {
  try {
    console.log("Creating requirement", id);
    const requirement = await db.requirement.create({
      data: {
        subject,
        grade,
        description,
        address,
        amount,
        duration,
        phone,
        startDate,
        status: "PENDING",
        studentId: id,
      },
    });

    return { error: null, data: requirement };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: null };
  }
}

export async function getSpecificRequirement(id: number, userId: number) {
  try {
    const res = await db.requirement.findUnique({
      where: {
        id,
        studentId: userId,
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
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: null };
  }
}

export async function approveProposal(proposalId: number) {
  try {
    const res = await db.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    await db.requirement.update({
      where: {
        id: res.requirementId,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    //reject all other proposals
    await db.proposal.updateMany({
      where: {
        requirementId: res.requirementId,
        id: {
          not: proposalId,
        },
      },
      data: {
        status: "REJECTED",
      },
    });
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: null };
  }
}

export async function getSpecificTution(id: number) {
  try {
    const res = await db.requirement.findUnique({
      where: {
        id,
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
    return { error: null, data: res };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong", data: null };
  }
}

export async function getAllTutors() {
  try {
    const res = await db.user.findMany({
      where: {
        role: "TUTOR",
      },
      include: {
        _count: {
          select: {
            proposals: true,
          },
        },
        proposals: {
          where: {
            status: "ACCEPTED",
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
