'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const storedCount = localStorage.getItem('conversionCount')
      setCount(storedCount ? parseInt(storedCount, 10) : 0)
    }

    updateCount() // Initial count
    window.addEventListener('storage', updateCount)
    return () => window.removeEventListener('storage', updateCount)
  }, [])

  return (
    <div className="text-center mt-8">
      <p className="text-sm text-gray-600">
        Aantal tekstomzettingen: <span className="font-bold">{count}</span>
      </p>
    </div>
  )
}

