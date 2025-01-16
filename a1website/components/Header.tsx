import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

export default function Header() {
  return (
    <header className="text-center mb-12">
      <h1 className={`${pacifico.className} text-6xl font-bold text-blue-600 mb-6`}>
        Maak je tekst leesbaar voor iedereen
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Zet je tekst om naar taalniveau A1 in 1 klik! Alle moeilijke woorden eruit, alleen maar leesbare taal. Makkelijker kan niet. En iedereen begrijpt je.
      </p>
    </header>
  )
}

