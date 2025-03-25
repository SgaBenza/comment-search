import { API_URL } from './constants'
import { CommentResponse } from './types';

// Helper function to parse Link header
function parseLinkHeader(header: string | null): Record<string, string> {
  if (!header) return {};
  
  return header.split(',').reduce((links: Record<string, string>, part: string) => {
    const match = part.match(/<(.+)>;\s*rel="(\w+)"/)
    if (match) {
      const [, url, rel] = match
      links[rel] = url
    }
    return links
  }, {})
}

export async function getData(field: string, param: string, value: string) {
  const url = API_URL + `/comments?_page=2&_limit=2&${field}${param}=${value}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    // Get pagination links from header
    const linkHeader = response.headers.get('link')
    const links = parseLinkHeader(linkHeader)
    
    // Get total count from header (if available)
    const totalCount = response.headers.get('x-total-count')
    
    const data = await response.json() as CommentResponse

    return {
      data,
      pagination: {
        links,
        totalCount: totalCount ? parseInt(totalCount, 10) : undefined
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred')
    }
    return undefined
  }
}