export function convertToCSV(data: any) {
	const csvData = []

	// Push header row
	const headerRow = Object.keys(data[0])
	csvData.push(headerRow)

	// Push data rows
	// @ts-expect-error // <--
	data.forEach(item => {
		const row = Object.values(item)
		csvData.push(row)
	})

	return csvData
}
