"use server";

import db from "@/lib/db";
import { Role } from "@prisma/client";

export async function register(
  email: string,
  password: string,
  phone: string,
  name: string,
  role: Role
) {
  try {
    let user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return { error: "User already exists.", data: null };
    }
    user = await db.user.create({
      data: {
        email,
        password,
        phone,
        name,
        role,
      },
    });
    return { error: null, data: { id: user.id, role: user.role } };
  } catch (err) {
    console.log(err);
    return { error: "Registration failed.", data: null };
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) {
      return { error: "Invalid email or password.", data: null };
    }
    return { error: null, data: { id: user.id, role: user.role } };
  } catch (err) {
    console.log(err);
    return { error: "Login failed.", data: null };
  }
}
