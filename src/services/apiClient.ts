import { API_BASE_URL } from '../constants/config';

// ---------------------------------------------------------------------------
// Error type — exported so callers can catch and instanceof-check it
// ---------------------------------------------------------------------------

export interface ApiValidationError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  readonly errors?: ReadonlyArray<ApiValidationError>;

  constructor(message: string, errors?: ApiValidationError[]) {
    super(message);
    this.name = 'ApiError';
    // Restore prototype chain for instanceof checks after TypeScript compilation
    Object.setPrototypeOf(this, ApiError.prototype);
    this.errors = errors;
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

interface ErrorBody {
  success?: false;
  message?: string;
  errors?: ApiValidationError[];
}

const BASE_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function parseErrorResponse(response: Response): Promise<never> {
  let message = `Request failed with status ${response.status}`;
  let errors: ApiValidationError[] | undefined;

  try {
    const body = (await response.json()) as ErrorBody;
    if (body.message) message = body.message;
    errors = body.errors;
  } catch {
    // Body is not JSON — the status-based fallback message is used
  }

  throw new ApiError(message, errors);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function apiGet<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: BASE_HEADERS,
    });
  } catch {
    throw new ApiError('Network error — please check your connection and try again');
  }

  if (!response.ok) return parseErrorResponse(response);
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: BASE_HEADERS,
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Network error — please check your connection and try again');
  }

  if (!response.ok) return parseErrorResponse(response);
  return response.json() as Promise<T>;
}
