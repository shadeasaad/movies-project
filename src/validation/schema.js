import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const BasicSchema = yup.object().shape({
  userName: yup.string().min(3, "Username must be at least 3 characters").required("Required"),
  email: yup.string().email("please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .max(20)
    .matches(passwordRules, { message: "your password  must have capital and small letters" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("Required"),
});