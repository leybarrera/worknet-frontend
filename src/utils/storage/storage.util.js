const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

const removeStorage = (key) => {
  localStorage.removeItem(key)
}

export default { saveToLocalStorage, getFromLocalStorage, removeStorage }
