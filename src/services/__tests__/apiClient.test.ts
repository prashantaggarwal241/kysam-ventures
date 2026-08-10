import { apiGet, apiPost, ApiError } from '../apiClient';

// ---------------------------------------------------------------------------
// Fetch mock setup
// ---------------------------------------------------------------------------

const mockFetch = jest.fn();
beforeEach(() => {
  global.fetch = mockFetch;
});
afterEach(() => {
  jest.resetAllMocks();
});

// ---------------------------------------------------------------------------
// Helper: build a minimal Response-like object
// ---------------------------------------------------------------------------

function mockResponse(
  ok: boolean,
  status: number,
  body: unknown,
): { ok: boolean; status: number; json: jest.Mock } {
  return { ok, status, json: jest.fn().mockResolvedValue(body) };
}

// ---------------------------------------------------------------------------
// apiGet — success path
// ---------------------------------------------------------------------------

describe('apiGet — success', () => {
  it('returns parsed JSON on a 200 response', async () => {
    const payload = { id: '1', name: 'KySam Ventures' };
    mockFetch.mockResolvedValueOnce(mockResponse(true, 200, payload));

    const result = await apiGet<typeof payload>('/company');

    expect(result).toEqual(payload);
  });

  it('calls fetch with GET method and JSON headers', async () => {
    mockFetch.mockResolvedValueOnce(mockResponse(true, 200, {}));

    await apiGet('/company');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/company'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ Accept: 'application/json' }),
      }),
    );
  });
});

// ---------------------------------------------------------------------------
// apiGet — error path
// ---------------------------------------------------------------------------

describe('apiGet — server errors', () => {
  it('throws ApiError when the response is not ok', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(false, 422, { success: false, message: 'Validation failed' }),
    );

    await expect(apiGet('/test')).rejects.toBeInstanceOf(ApiError);
  });

  it('throws ApiError whose message matches the server error body', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(false, 422, { success: false, message: 'Name is required' }),
    );

    let caught: unknown;
    try {
      await apiGet('/test');
    } catch (err) {
      caught = err;
    }

    expect((caught as ApiError).message).toBe('Name is required');
  });

  it('includes the errors array from the server body when present', async () => {
    const errors = [
      { field: 'email', message: 'Invalid format' },
      { field: 'name', message: 'Cannot be empty' },
    ];
    mockFetch.mockResolvedValueOnce(
      mockResponse(false, 422, { success: false, message: 'Validation failed', errors }),
    );

    let caught: unknown;
    try {
      await apiGet('/test');
    } catch (err) {
      caught = err;
    }

    expect((caught as ApiError).errors).toEqual(errors);
  });

  it('falls back to a status-based message when the body is not JSON', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
    });

    let caught: unknown;
    try {
      await apiGet('/test');
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).message).toBe('Request failed with status 500');
  });

  it('throws ApiError on a 404', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(false, 404, { success: false, message: 'Resource not found' }),
    );

    let caught: unknown;
    try {
      await apiGet('/missing');
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).message).toBe('Resource not found');
  });
});

// ---------------------------------------------------------------------------
// apiGet — network error
// ---------------------------------------------------------------------------

describe('apiGet — network failure', () => {
  it('throws ApiError when fetch itself rejects', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(apiGet('/test')).rejects.toBeInstanceOf(ApiError);
  });

  it('uses the standard network-error message', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    let caught: unknown;
    try {
      await apiGet('/test');
    } catch (err) {
      caught = err;
    }

    expect((caught as ApiError).message).toBe(
      'Network error — please check your connection and try again',
    );
  });
});

// ---------------------------------------------------------------------------
// apiPost — success and error
// ---------------------------------------------------------------------------

describe('apiPost', () => {
  it('sends POST with serialised JSON body', async () => {
    const payload = { id: 'abc' };
    mockFetch.mockResolvedValueOnce(mockResponse(true, 201, payload));

    const body = { name: 'Alice', email: 'alice@example.com', message: 'Hi' };
    await apiPost('/enquiries', body);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/enquiries'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    );
  });

  it('returns parsed response on success', async () => {
    const responseData = { id: 'xyz123', status: 'Pending', createdAt: '2026-01-01T00:00:00Z' };
    mockFetch.mockResolvedValueOnce(mockResponse(true, 201, responseData));

    const result = await apiPost<typeof responseData>('/enquiries', {});
    expect(result).toEqual(responseData);
  });

  it('throws ApiError on a non-ok POST response', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(false, 400, { success: false, message: 'Bad request' }),
    );

    await expect(apiPost('/enquiries', {})).rejects.toBeInstanceOf(ApiError);
  });

  it('throws ApiError on network failure during POST', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(apiPost('/enquiries', {})).rejects.toBeInstanceOf(ApiError);
  });
});

// ---------------------------------------------------------------------------
// ApiError — class properties
// ---------------------------------------------------------------------------

describe('ApiError', () => {
  it('is an instance of Error', () => {
    expect(new ApiError('test')).toBeInstanceOf(Error);
  });

  it('has name ApiError', () => {
    expect(new ApiError('test').name).toBe('ApiError');
  });

  it('carries the message', () => {
    expect(new ApiError('something went wrong').message).toBe('something went wrong');
  });

  it('errors is undefined when not provided', () => {
    expect(new ApiError('test').errors).toBeUndefined();
  });
});
