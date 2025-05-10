const faqs = [
  {
    q: "What is a marriage biodata?",
    a: "A marriage biodata is a document that provides key personal, family and professional details to help in arranged matchmaking. It typically includes information like name, age, education, profession, family background and partner preferences."
  },
  // ...add the rest of your FAQ items here
]

export default function FAQSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-medium text-gray-900">{faq.q}</h3>
              <p className="text-gray-700 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}