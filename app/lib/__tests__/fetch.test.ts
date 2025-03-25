import { getData } from '../fetch';
import { API_URL } from '../constants';

// Mock the global fetch function
global.fetch = jest.fn();

describe('getData', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should successfully fetch data', async () => {
    const mockResponse = { data: 'test pippo' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getData('data', 'contains', 'value');
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/comments?data_contains=value`
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle non-OK response', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getData('test', 'eq', 'value');

    expect(consoleSpy).toHaveBeenCalledWith('Response status: 404');
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });

  it('should handle fetch error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(error);

    const result = await getData('test', 'eq', 'value');

    expect(consoleSpy).toHaveBeenCalledWith('Network error');
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });

  it('should handle unknown error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (global.fetch as jest.Mock).mockRejectedValueOnce('Unknown error');

    const result = await getData('test', 'eq', 'value');

    expect(consoleSpy).toHaveBeenCalledWith('An unknown error occurred');
    expect(result).toBeUndefined();
    consoleSpy.mockRestore();
  });
}); 