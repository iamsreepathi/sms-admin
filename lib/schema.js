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

export const TeacherSchema = z.object({
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
  gender: z.enum(gender, {
    required_error: "Gender is required.",
  }),
  subject: z
    .string({ required_error: "Subject is required." })
    .trim()
    .min(4, { message: "Subject should be atleast 4 caharacters." }),
  depId: z.number({ invalid_type_error: "Department is required." }),
});

export const DepartmentSchema = z.object({
  name: z.string().trim().min(5),
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Invalid email address." }),
  shortDesc: z
    .string({ required_error: "Short desc is required." })
    .trim()
    .min(10)
    .max(255),
  description: z
    .string({ required_error: "Description is required." })
    .trim()
    .min(10),
  phone: z.string().trim().min(10).max(25),
  line1: z
    .string({ required_error: "Address line 1 desc is required." })
    .trim()
    .min(5)
    .max(100),
  line2: z
    .string({ required_error: "Address line 2 is required." })
    .trim()
    .min(5)
    .max(50),
  city: z
    .string({ required_error: "City is required." })
    .trim()
    .min(1)
    .max(100),
  region: z
    .string({ required_error: "State is required." })
    .trim()
    .min(2)
    .max(2),
  postalCode: z.string().refine((value) => /^\d{5}(?:-\d{4})?$/.test(value), {
    message: "Invalid ZIP code format",
  }),
});

export const CategorySchema = z.object({
  name: z
    .string({ required_error: "Category name is required." })
    .trim()
    .min(5, { message: "Name should be atleast 5 caharacters." }),
  description: z
    .string({ required_error: "Description is required." })
    .trim()
    .min(10),
});

export const HodSchema = z.object({
  hodId: z.number({ invalid_type_error: "Head of Department is required." }),
});
