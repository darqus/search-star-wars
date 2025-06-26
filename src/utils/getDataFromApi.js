export const API_URL = 'https://star-wars-api-v3.netlify.app/api/v1'
export const RESOURCE_URL = 'https://star-wars-api-v3.netlify.app'
export const IMG_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='

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
