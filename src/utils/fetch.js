export const URL = 'https://swapi.dev/api'

export const API_LIST = [
  'people',
  'planets',
  'films',
  'species',
  'vehicles',
  'starships',
]

export const getDataFromApi = async (selectedApi) => {
  const res = await fetch(`${URL}/${selectedApi}`)
  const data = await res.json()
  return data
}
