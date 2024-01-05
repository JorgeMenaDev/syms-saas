export function convertToCSV(data: any) {
	const csvData = []
	console.log(data)

	// Push header row
	const headerRow = Object.keys(data[0])
	csvData.push(headerRow)

	// Push data rows
	// @ts-expect-error // <--
	data.forEach(item => {
		// if the column is "estado" this means the value is a boolean, we need to map this to instead return "Activo" or "Inactivo"

		const row = Object.values(item).map((value, index) => {
			if (headerRow[index] === 'estado') {
				return value ? 'Activo' : 'Inactivo'
			}

			return value
		})

		csvData.push(row)

		// const row = Object.values(item)
		// csvData.push(row)
	})

	console.log(csvData)

	return csvData
}
