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

export const getDataFromApi = async (
  selectedApi,
  searchQuery = '',
  limit = 5
) => {
  let url = `${API_URL}/${selectedApi}`

  const params = new URLSearchParams()

  // Add search query if provided
  if (searchQuery) {
    params.append('search', searchQuery)
  }

  // Add limit parameter
  params.append('limit', limit.toString())

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  const res = await fetch(url)
  const data = await res.json()

  // The new API already returns results in the expected format
  return {
    results: data.results || [],
    total: data.total || 0,
    pages: data.pages || 0,
    currentPage: data.page || 1,
  }
}
