import axios from 'axios'
// import qs from 'qs'
const url = 'http://localhost:8089/assistant/member'

// 分页数据
export function list(query) {
  return axios.post(url + '/list', query)
}
