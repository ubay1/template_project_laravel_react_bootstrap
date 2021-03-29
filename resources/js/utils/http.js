import Axios from "axios";
import { AxiosNormal, DevUrl, DevApiUrl } from "./helper";

export async function HTTPRegisterUser(param) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        nama: param.nama,
        email: param.email,
        password: param.password,
      }
      const responseRegisterUser = await AxiosNormal(10000).post(`${DevApiUrl}/user/auth/signup`, data)
      return resolve(responseRegisterUser)
    } catch (error) {
      return reject(error)
    }
  })
}

export async function HTTPLoginUser(param) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        email: param.email,
        password: param.password,
      }
      const responseLoginUser = await AxiosNormal(10000).post(`${DevApiUrl}/user/auth/login`, data)
      return resolve(responseLoginUser)
    } catch (error) {
      return reject(error)
    }
  })
}