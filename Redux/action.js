export const GET_USER_LIST = "GET_USER_LIST";
export const SET_USER_LIST = "SET_USER_LIST";

export const getUserList = (data) => {
    return {
        type: GET_USER_LIST,
        data
    }
}