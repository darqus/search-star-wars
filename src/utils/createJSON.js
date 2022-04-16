const renderJSON = (data, params = [null, 2]) => JSON.stringify(data, ...params)

const filteredBoolean = ({ ...data }) => Object
  .entries(data)
  .reduce((acc, [key, value]) => (value ? { ...acc, [key]: value } : acc), {})

const createJSON = ({ ...data }) => renderJSON(filteredBoolean(data))

export default createJSON
