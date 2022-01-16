const { default: axiosClient } = require("../../utils/axios")

const register = async (data) => {
    await axiosClient.post("api/users", data);
}
export {register};