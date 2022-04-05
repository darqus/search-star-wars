export const findMatch = (string, search) => {
  if (!string && !search) return

  return [
    string.substring(0, search.length),
    string.substring(search.length)
  ]
}


export const getIDfromAPI_URL = (url) => +url.split('/').reverse()[1]
