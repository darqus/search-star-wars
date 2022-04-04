const renderJSON = (data, params = [null, 2]) => JSON.stringify(data, ...params)

export const createJSON = ({ ...data }) => {

  const filteredBooleanJSON = Object
    .entries(data)
    .reduce((acc, [key, value]) => (value ? { ...acc, [key]: value } : acc), {})

  return renderJSON(filteredBooleanJSON)
}
