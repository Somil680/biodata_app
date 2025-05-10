export default function TemplatesSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Select from multiple templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Template 1: Blue script */}
          <div className="bg-white border rounded shadow flex flex-col items-center justify-center p-4 h-48">
            <span className="text-blue-700 font-script text-2xl mb-2">Shanu Aggrawal</span>
            <span className="text-gray-500 text-xs">(Blue script style)</span>
          </div>
          {/* Template 2: Photo */}
          <div className="bg-white border rounded shadow flex flex-col items-center justify-center p-4 h-48">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
            <span className="text-gray-700 text-sm">Photo template</span>
          </div>
          {/* Template 3: Floral */}
          <div className="bg-white border rounded shadow flex flex-col items-center justify-center p-4 h-48">
            <div className="w-12 h-12 bg-pink-200 rounded-full mb-2"></div>
            <span className="text-pink-700 text-sm">Floral design</span>
          </div>
        </div>
      </div>
    </section>
  )
}