export async function getData(field: string, param: string, value: string) {
  const url = `https://mockend.com/api/mockend/demo/comments?${field}_${param}=${value}`
  const response = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      return res.json()
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unknown error occurred')
      }
    })

  return response
}
