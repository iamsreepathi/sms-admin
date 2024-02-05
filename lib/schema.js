import { z } from "zod";

const gender = ["Male", "Female"];

export const StudentSchema = z.object({
  name: z
    .string({ required_error: "Full name is required." })
    .trim()
    .min(5, { message: "Name should be atleast 5 caharacters." }),
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Invalid email address." }),
  father: z
    .string({ required_error: "Father name is required." })
    .trim()
    .min(5, { message: "Name should be atleast 5 caharacters." }),
  mother: z
    .string({ required_error: "Mother name is required." })
    .trim()
    .min(5, { message: "Name should be atleast 5 caharacters." }),
  dob: z.date({ required_error: "Date of birth is required." }),
  admission: z.date({ required_error: "Admission date is required." }),
  gender: z.enum(gender, { required_error: "Gender is required." }),
});
