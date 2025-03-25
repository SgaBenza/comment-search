import { getData } from '../fetch'

// Mock fetch globally
global.fetch = jest.fn()

describe('getData', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should fetch data successfully with pagination', async () => {
        const mockData = {
            id: 1,
            title: 'Test Comment'
        }

        const mockLinkHeader = '<http://api/comments?page=2>; rel="next", <http://api/comments?page=1>; rel="first"'

            ; (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
                headers: new Headers({
                    'link': mockLinkHeader,
                    'x-total-count': '10'
                })
            })

        const url = 'http://api/comments'
        const result = await getData(url)

        expect(global.fetch).toHaveBeenCalledWith(url)
        expect(result).toEqual({
            data: mockData,
            pagination: {
                links: {
                    next: 'http://api/comments?page=2',
                    first: 'http://api/comments?page=1'
                },
                totalCount: 10
            }
        })
    })

    it('should handle missing pagination headers', async () => {
        const mockData = {
            id: 1,
            title: 'Test Comment'
        }

            ; (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
                headers: new Headers({})
            })

        const result = await getData('http://api/comments')

        expect(result).toEqual({
            data: mockData,
            pagination: {
                links: {},
                totalCount: undefined
            }
        })
    })

    it('should handle failed requests', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404
        })

        const result = await getData('http://api/comments')

        expect(result).toBeUndefined()
    })

    it('should handle network errors', async () => {
        ; (global.fetch as jest.Mock).mockRejectedValueOnce(
            new Error('Network error')
        )

        const result = await getData('http://api/comments')

        expect(result).toBeUndefined()
    })

    it('should handle malformed JSON response', async () => {
        ; (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => { throw new Error('Invalid JSON') },
            headers: new Headers({})
        })

        const result = await getData('http://api/comments')

        expect(result).toBeUndefined()
    })

    it('should parse complex link headers correctly', async () => {
        const mockData = { id: 1 }
        const complexLinkHeader =
            '<http://api/comments?page=2>; rel="next", ' +
            '<http://api/comments?page=1>; rel="first", ' +
            '<http://api/comments?page=10>; rel="last", ' +
            '<http://api/comments?page=4>; rel="prev"'

            ; (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
                headers: new Headers({
                    'link': complexLinkHeader,
                    'x-total-count': '100'
                })
            })

        const result = await getData('http://api/comments')

        expect(result?.pagination.links).toEqual({
            next: 'http://api/comments?page=2',
            first: 'http://api/comments?page=1',
            last: 'http://api/comments?page=10',
            prev: 'http://api/comments?page=4'
        })
    })
})
