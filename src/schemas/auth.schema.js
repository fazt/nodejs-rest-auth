import z from "zod";

export const signupSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    })
    .min(6)
    .max(255),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6)
    .max(255),
});
