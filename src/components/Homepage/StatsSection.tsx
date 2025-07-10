import React from 'react'

const stats = [
  { label: 'Biodatas Created', value: '10,000+' },
  { label: 'User Rating', value: '4.9/5' },
  { label: 'Templates Available', value: '20+' },
  { label: 'Active Users', value: '2,500+' },
]

const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-extrabold text-[#D40000] animate-pulse">
                {stat.value}
              </span>
              <span className="mt-2 text-base md:text-lg text-gray-700 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
