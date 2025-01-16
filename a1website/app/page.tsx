import Header from './components/Header'
import ConversionForm from './components/ConversionForm'
import Counter from './components/Counter'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <Header />
        <ConversionForm />
        <Counter />
        <div className="mt-8 text-sm text-gray-500">
          <p>Disclaimer: [De tekst wordt gemaakt door OpenAI]</p>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-sm text-gray-500">
        Een Wibert idee, 2025
      </div>
    </main>
  )
}

