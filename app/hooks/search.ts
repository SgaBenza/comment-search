import { useCallback } from 'react'
import { getData } from '../lib/fetch'
import { Comment, GetDataResponse } from '../lib/types'

export const useHandleSubmit = (searchText: string, setData: (data: GetDataResponse<Comment>) => void) => {
  // The useCallback hook is used to memoize the function so that it is not recreated on every render.
  return useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchText.length > 3) {
        getData('', 'q', searchText).then((response) => {
          setData(response as GetDataResponse<Comment>)
        })
      } else {
        alert('Search text must be longer than 3 characters.')
      }
    },
    [searchText, setData]
  )
}
