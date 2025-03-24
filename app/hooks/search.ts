import { useCallback } from 'react'
import { getData } from '../lib/fetch'
import { Comment } from '../lib/types'

export const useHandleSubmit = (searchText: string, setData: (data: Comment[]) => void) => {
  return useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchText.length > 3) {
        getData('body', 'contains', searchText).then((response) => {
          setData(response)
        })
      } else {
        alert('Search text must be longer than 3 characters.')
      }
    },
    [searchText, setData]
  )
}
