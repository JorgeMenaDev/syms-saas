import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import Providers from '@/providers'

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Syms Residuos',
	description: 'Syms Residuos'
}

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				<main className=''>
					<Toaster />
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	)
}
