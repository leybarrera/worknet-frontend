function formatFechaISO(fechaISO) {
  const fecha = new Date(fechaISO)
  const año = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0') // Meses van de 0 a 11
  const dia = String(fecha.getDate()).padStart(2, '0')

  return `${año}/${mes}/${dia}`
}

export default {
  formatFechaISO,
}
