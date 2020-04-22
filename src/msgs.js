import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/chat'







const getAll =  () => {
  const request =  axios.get(baseUrl)
  console.log(request);
  // const nonExisting = {
  //   content: 'This note is not saved to server',
  //   date: '2019-05-30T17:30:31.098Z',
  //   username: "rachel",
  // }
  // //return request.then(response => response.data.concat(nonExisting))


  return request.then(response => {
    const data = response.data
    console.log(data)
    return data//.concat(nonExisting)
  })

}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }