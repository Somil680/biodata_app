export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center w-full">
          <button className="md:hidden mr-3" aria-label="Open menu">
            {/* Hamburger icon */}
            <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </button>
          <div className="flex-1 flex justify-center md:justify-start">
            <span className="font-semibold text-lg text-gray-900">Biodata Maker</span>
          </div>
        </div>
        <a href="/login" className="text-gray-700 hover:text-[#D40000] font-medium ml-4">Login</a>
      </div>
    </header>
  )
}