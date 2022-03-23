const URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async () => {
  const res = await fetch(`${URL}/users`)
  const data = await res.json()
  return data
}
