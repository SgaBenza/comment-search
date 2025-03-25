import { useCallback } from 'react'
import { getData } from '../lib/fetch'
import { Comment, GetDataResponse } from '../lib/types'
import { API_URL } from '../lib/constants'

export const useHandleSubmit = (
  searchText: string,
  setData: (data: GetDataResponse<Comment>) => void
) => {
  // The useCallback hook is used to memoize the function so that it is not recreated on every render.
  const url = API_URL + `/comments?_page=1&_limit=40&q=${searchText}`
  return useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchText.length > 3) {
        handlePagination(url, setData)
      } else {
        alert('Search text must be longer than 3 characters.')
      }
    },
    [searchText, setData, url]
  )
}

export const handlePagination = (
  url: string,
  setData: (data: GetDataResponse<Comment>) => void
) => {
  getData(url).then((response) => {
    setData(response as GetDataResponse<Comment>)
  })
}
