import axiosClient from "../../utils/axios"

const login = async (data) => {
    await axiosClient.post("/api/auth/local", {
        identifier: data.email,
        password: data.password
    } )
}
export {login};