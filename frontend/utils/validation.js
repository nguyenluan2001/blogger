import * as yup from "yup";
const registerSchema = yup.object().shape({
    fullname: yup.string().required("Fullname is required"),
    email: yup.string().required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirm_password: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm password is required"),
})
const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")

})
const filterSchema = yup.object().shape({
    duration: yup.object().shape({
        startDate: yup.date(),
        endDate: yup.date().min(yup.ref("startDate"), "Start date can't be bigger than end date")
    }),
    tags: yup.mixed(),
    keyword: yup.string()

})
export {registerSchema, loginSchema, filterSchema};