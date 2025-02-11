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

const updateStorage = (key, keyValue, value) => {
  const storage = getFromLocalStorage(key)
  const newStorage = {
    ...storage,
    [keyValue]: value,
  }

  saveToLocalStorage(key, newStorage)
}

export default {
  saveToLocalStorage,
  getFromLocalStorage,
  removeStorage,
  updateStorage,
}
