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

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Invalid email address." }),
  password: z.string({ required_error: "Password is required." }),
});

export const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(
        new RegExp("^d{3}-d{3}-d{4}$"),
        "Please enter a valid phone number."
      ),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });
