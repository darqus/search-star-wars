export const API_URL = 'https://swapi.dev/api'
export const RESOURCE_URL = 'https://starwars-visualguide.com'
export const IMG_PLACEHOLDER = `${RESOURCE_URL}/assets/img/placeholder.jpg`

export const SEARCH_API_LIST = [
  {
    api: 'people',
    searchFields: ['name'],
    imgApiPath: 'characters',
  },
  {
    api: 'planets',
    searchFields: ['name'],
    imgApiPath: 'planets',
  },
  {
    api: 'films',
    searchFields: ['title'],
    imgApiPath: 'films',
  },
  {
    api: 'species',
    searchFields: ['name'],
    imgApiPath: 'species',
  },
  {
    api: 'vehicles',
    searchFields: [
      'name',
      'model',
    ],
    imgApiPath: 'vehicles',
  },
  {
    api: 'starships',
    searchFields: [
      'name',
      'model',
    ],
    imgApiPath: 'starships',
  },
]

export const getDataFromApi = async (selectedApi) => {
  const res = await fetch(`${API_URL}/${selectedApi}`)
  const data = await res.json()
  return data
}
