const url = 'http://localhost:8089/assistant/member'

// 分页数据
export function list(query) {
  return this.$ajax({
    url: url + '/list',
    method: 'get',
    param: query
  })
}
