'use client'


interface SearchBoxProps {
  searchText: string
  onSubmit: (e: React.FormEvent) => void
  onSearchTextChange: (searchText: string) => void
}

export const SearchBox = ({ searchText, onSubmit, onSearchTextChange }: SearchBoxProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        placeholder="Search..."
        className="border border-gray-300 rounded px-4 py-2"
        minLength={3}
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
        Submit
      </button>
    </form>
  )
}
