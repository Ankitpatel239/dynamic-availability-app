import Link from "next/link";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/4 bg-gray-800 text-white">
        <header className="p-4">
          <Link href="/dashboard" className="text-2xl">
            <h1>My Dashboard</h1>
          </Link>
        </header>
        <nav className="p-4">
          <ul className="flex flex-col">
            <li className="py-2">
              <Link
                href="/dashboard/settings"
                className="text-gray-300 hover:text-white"
              >
                Settings
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/available"
                className="text-gray-300 hover:text-white"
              >
                Available
              </Link>
            </li>
            <li className="py-2">
              <Link
                href="/dashboard/event"
                className="text-gray-300 hover:text-white"
              >
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="w-3/4 bg-gray-100 p-4 flex-1 px-4 py-8 md:px-6 md:py-12">{children}</main>
    </div>
  );
}
