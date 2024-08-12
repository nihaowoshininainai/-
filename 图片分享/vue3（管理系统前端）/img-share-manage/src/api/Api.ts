import axios from "axios";

axios.defaults.baseURL = '/api'

const request = axios

const getAllUser = () => request.get('/user/getAll')

const getUserByName = (uname: string) => request.get(`/user/getByName?uname=${uname}`)

const delUserById = (id: number) => request.get(`/user/delById?id=${id}`)

const getAllImg = () => request.get('/img/getAll')

const getImgByName = (iname: string) => request.get(`/img/getByName?name=${iname}`)

const delImgById = (id: number) => request.get(`/img/delById?id=${id}`)

const getAllComment = () => request.get('/comment/getAll')

const delCommentById = (id: number) => request.get(`/comment/delById?id=${id}`)

const Api = {
    getUser: getAllUser,
    searchUser: getUserByName,
    delUser: delUserById,
    getImg: getAllImg,
    searchImg: getImgByName,
    delImg: delImgById,
    getComment: getAllComment,
    delComment: delCommentById
}

export default Api