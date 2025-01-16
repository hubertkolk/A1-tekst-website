'use client'

import { useState, useEffect, useCallback } from 'react'
import { convertToNT1 } from '../actions/convertToNT1'

export default function ConversionForm() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const words = inputText.trim().split(/\s+/)
    setWordCount(words.length)
  }, [inputText])

  const incrementConversionCount = useCallback(() => {
    const currentCount = parseInt(localStorage.getItem('conversionCount') || '0', 10);
    const newCount = currentCount + 1;
    localStorage.setItem('conversionCount', newCount.toString());
    window.dispatchEvent(new Event('storage'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const { success, result } = await convertToNT1(inputText)
      if (success) {
        setOutputText(result)
        incrementConversionCount()
      } else {
        setError(result)
        setOutputText('')
      }
    } catch (error) {
      console.error('Error converting text:', error)
      setError('Er is een onverwachte fout opgetreden. Probeer het later opnieuw.')
      setOutputText('')
    }
    setIsLoading(false)
  }

  const handleClearInput = () => {
    setInputText('')
    setWordCount(0)
  }

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }, (err) => {
      console.error('Failed to copy text: ', err)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700">
          Jouw tekst (max 200 woorden)
        </label>
        <div className="mt-1 relative">
          <textarea
            id="input-text"
            rows={5}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute bottom-2 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
          >
            Wissen
          </button>
        </div>
        <p className={`text-sm mt-1 ${wordCount > 200 ? 'text-red-500' : 'text-gray-500'}`}>
          {wordCount}/200 woorden
        </p>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || wordCount > 200}
        >
          {isLoading ? 'Bezig met omzetten...' : 'Omzetten maar!'}
        </button>
      </div>
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>{error}</p>
          <p className="text-sm mt-1">Als dit probleem aanhoudt, neem dan contact op met onze klantenservice.</p>
        </div>
      )}
      <div>
        <label htmlFor="output-text" className="block text-sm font-medium text-gray-700">
          Het resultaat
        </label>
        <div className="mt-1 relative">
          <textarea
            id="output-text"
            rows={5}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
            value={outputText}
            readOnly
          />
          <button
            type="button"
            onClick={handleCopyOutput}
            className="absolute bottom-2 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
          >
            {copySuccess ? 'Gekopieerd!' : 'Kopiëren'}
          </button>
        </div>
      </div>
    </form>
  )
}

