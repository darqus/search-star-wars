export const isMatchesStringFromPhrase = (phrase, string) => phrase
  .toLowerCase()
  .split(' ')
  .some((it) => it.startsWith(string.toLowerCase()))


export const getHighlightedStringFromPhrase = (phrase, string) => {
  if (!phrase && !string) return

  const firtLettersOfWord = phrase
    .split(' ')
    .find((it) => it.toLowerCase().startsWith(string.toLowerCase()))
    .substring(0, string.length)

  const slpittedPhrase = phrase.split(firtLettersOfWord)

  const result = [slpittedPhrase[0], firtLettersOfWord, slpittedPhrase[1]]

  return result
}

export const getIDfromApiUrl = (url) => +url.split('/').reverse()[1]
