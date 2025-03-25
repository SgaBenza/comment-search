import { PaginationLinks } from '../lib/types'

export const Pagination = ({
  links,
  callback = () => {},
}: {
  links: PaginationLinks
  callback: (url: string) => void
}) => {
  return (
    <div className="flex justify-center gap-4">
      {Object.entries(links).map(([rel, url], index) => (
        <div key={index} className="text-blue-600 cursor-pointer" onClick={() => callback(url)}>
          {rel}
        </div>
      ))}
    </div>
  )
}
