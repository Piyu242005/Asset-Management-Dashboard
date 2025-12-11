import Link from 'next/link'
import { LayoutShell } from '../components/LayoutShell'

export default function NotFound() {
    return (
        <LayoutShell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-6xl">
                    🚧
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                    The page you are looking for is currently under construction or does not exist.
                </p>
                <Link
                    href="/"
                    className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20"
                >
                    Return Home
                </Link>
            </div>
        </LayoutShell>
    )
}
