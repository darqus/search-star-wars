export const URL = 'https://swapi.dev/api'

export const API_LIST = [
  {
    api: 'people',
    searchFields: ['name']
  },
  {
    api: 'planets',
    searchFields: ['name']
  },
  {
    api: 'films',
    searchFields: ['title']
  },
  {
    api: 'species',
    searchFields: ['name']
  },
  {
    api: 'vehicles',
    searchFields: [
      'name',
      'model'
    ]
  },
  {
    api: 'starships',
    searchFields: [
      'name',
      'model'
    ]
  },
]

export const getDataFromApi = async (selectedApi) => {
  const res = await fetch(`${URL}/${selectedApi}`)
  const data = await res.json()
  return data
}
