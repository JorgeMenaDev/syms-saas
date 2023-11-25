/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8Ntr26JS4un
 */
import {
	SelectValue,
	SelectTrigger,
	SelectLabel,
	SelectItem,
	SelectGroup,
	SelectContent,
	Select
} from '@/components/ui/select'

export function LangSelector() {
	return (
		<Select>
			<SelectTrigger className='flex items-center space-x-2 w-[180px]'>
				<IconLanguage className='w-5 h-5 text-gray-500' />
				<SelectValue defaultValue='english' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Languages</SelectLabel>
					<SelectItem value='english'>English</SelectItem>
					<SelectItem value='español'>Español</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

function IconLanguage(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m5 8 6 6' />
			<path d='m4 14 6-6 2-3' />
			<path d='M2 5h12' />
			<path d='M7 2h1' />
			<path d='m22 22-5-10-5 10' />
			<path d='M14 18h6' />
		</svg>
	)
}
