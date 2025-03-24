'use client'

import { useState } from 'react'
import { SearchBox } from './components/SearchBox'
import { useHandleSubmit } from './hooks/search'
import { Comment } from './lib/types'
import { Comments } from './components/Comments'

export default function Home() {
  const [data, setData] = useState<Comment[]>([])
  const [searchText, setSearchText] = useState('')

  return (
    <div className="p-8 pb-20 h-screen">
      <main className="flex flex-col gap-8 h-full">
        <SearchBox
          searchText={searchText}
          onSubmit={useHandleSubmit(searchText, setData)}
          onSearchTextChange={setSearchText}
        />

        <Comments data={data} />
      </main>
    </div>
  )
}
