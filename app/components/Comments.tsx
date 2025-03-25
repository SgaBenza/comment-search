import { ellipsis } from '../lib/text'
import { Comment } from '../lib/types'

export const Comments = ({ data }: { data: Comment[] }) => {
  return (
    <ul
      className="flex flex-col gap-4 mt-8 h-3/4 overflow-y-auto"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'gray lightgray' }}
    >
      {data.map((comment) => (
        <li key={comment.id} className="border border-gray-300 rounded p-4">
          <h3 className="font-bold">{comment.name.toUpperCase()}</h3>
          <p>
            <a href={`mailto:${comment.email}`}>{comment.email}</a>
          </p>
          <p>{ellipsis(comment.body, 64)}</p>
        </li>
      ))}
    </ul>
  )
}
