"use server";

import prisma from "@/shared/lib/prisma";

interface RegistrationFormData {
  email: string;
  password: string;
}

export const registerUser = async ({
  email,
  password,
}: RegistrationFormData) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    console.log("user:", user);
    return user;
  } catch (error) {
    console.error("error while registration", error);
    return { error: "error while registration" };
  }
};
