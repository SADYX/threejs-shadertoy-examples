import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'threejs shadertoy-examples',
	description: 'threejs-shadertoy-examples',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
