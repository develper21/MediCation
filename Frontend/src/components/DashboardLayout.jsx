import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout({ children, pageTitle = 'Dashboard', pageSubtitle = '', fullWidth = false }) {
  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Topbar */}
        <Topbar title={pageTitle} subtitle={pageSubtitle} />

        {/* Content */}
        <main className={`flex-1 overflow-auto ${fullWidth ? 'p-4' : 'pt-28 pb-8 px-8'}`}>
          {fullWidth ? (
            children
          ) : (
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
