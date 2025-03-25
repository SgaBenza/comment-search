import { PaginationLinks } from '../lib/types'

export const Pagination = ({ links }: { links: PaginationLinks }) => {
  return (
    <div className="flex justify-center gap-4">
      {Object.entries(links).map(([rel, url], index) => (
        <a key={index} href={url} className="text-blue-600" target="_blank" rel="noreferrer">
          {rel}
        </a>
      ))}
    </div>
  )
}
