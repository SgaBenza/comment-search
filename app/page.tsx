'use client'

import { useState } from 'react'
import { SearchBox } from './components/SearchBox'
import { useHandleSubmit } from './hooks/search'
import { Comment } from './lib/types'

export default function Home() {
  const [data, setData] = useState<Comment[]>([])
  const [searchText, setSearchText] = useState('')

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SearchBox
          searchText={searchText}
          onSubmit={useHandleSubmit(searchText, setData)}
          onSearchTextChange={setSearchText}
        />
      </main>
    </div>
  )
}
