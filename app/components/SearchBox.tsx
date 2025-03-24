'use client'

// https://github.com/typicode/json-server/issues/1112

import { useState } from 'react'
import { getData } from '../lib/fetch'

export const SearchBox = () => {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchText.length > 3) {
      getData('body', 'contains', searchText).then((response) => {
        setData(response)
      })
    } else {
      alert('Search text must be longer than 3 characters.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 rounded px-4 py-2"
        minLength={3}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  )
}
