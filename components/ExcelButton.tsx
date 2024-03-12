import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as XLSX from 'xlsx'

export function ExcelButton({ name, data }: { name: string; data: any }) {
	const excelFileNameWithTodayDate = `${name}-${new Date().toLocaleDateString()}.xlsx`

	function handleExcelDownload() {
		try {
			const ws = XLSX.utils.json_to_sheet(data)
			const wb = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(wb, ws, 'Empresas')
			XLSX.writeFile(wb, excelFileNameWithTodayDate)
		} catch (error) {
			console.error(error)
			// TODO: handle error, toast, or something
		}
	}

	return (
		<Button onClick={handleExcelDownload}>
			<DownloadIcon className='h-5 w-5 mr-1' /> Excel
		</Button>
	)
}
