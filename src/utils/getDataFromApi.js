export const API_URL = 'https://star-wars-api-v3.netlify.app/api/v1'
export const RESOURCE_URL = 'https://star-wars-api-v3.netlify.app'
export const IMG_PLACEHOLDER = `${RESOURCE_URL}/image/characters/placeholder.jpg`

export const SEARCH_API_LIST = [
  {
    api: 'characters',
    searchFields: ['name'],
    imgApiPath: 'characters',
  },
  {
    api: 'locations',
    searchFields: ['name'],
    imgApiPath: 'locations',
  },
  {
    api: 'species',
    searchFields: ['name'],
    imgApiPath: 'species',
  },
  {
    api: 'creatures',
    searchFields: ['name'],
    imgApiPath: 'creatures',
  },
  {
    api: 'droids',
    searchFields: ['name'],
    imgApiPath: 'droids',
  },
  {
    api: 'vehicles',
    searchFields: ['name'],
    imgApiPath: 'vehicles',
  },
  {
    api: 'organizations',
    searchFields: ['name'],
    imgApiPath: 'organizations',
  },
]

export const getDataFromApi = async (selectedApi, searchQuery = '') => {
  let url = `${API_URL}/${selectedApi}`

  // Add search query if provided
  if (searchQuery) {
    url += `?search=${encodeURIComponent(searchQuery)}`
  }

  const res = await fetch(url)
  const data = await res.json()

  // Transform the new API format to match the old format expected by the app
  return {
    results: data.data || [],
  }
}
