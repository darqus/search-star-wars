export const createJSON = ({ ...data }) => {

  const filteredBooleanJSON = Object
    .entries(data)
    .reduce((acc, [key, value]) => (value ? { ...acc, [key]: value } : acc), {})

  return JSON.stringify(filteredBooleanJSON, null, 2)
}
