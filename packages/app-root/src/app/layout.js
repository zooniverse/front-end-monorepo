export const metadata = {
  title: 'Zooniverse',
  description: 'People-powered Research',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
