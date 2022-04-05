export const getItem = key => {
	try {
		return JSON.parse(localStorage.getItem(key))
	} catch (e) {
		console.error('Error getting data from localStorage', e)
		return null
	}
}

export const setItem = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (e) {
		console.error('Error setting data to localStorage', e)
	}
}

export const removeItem = key => {
	try {
		localStorage.removeItem(key)
	} catch (e) {
		console.error('Error removing data from localStorage', e)
	}
}
