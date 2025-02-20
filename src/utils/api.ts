import toast from 'react-hot-toast';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error('An unexpected error occurred');
  }
}

export function createApiError(status: number, message: string, code?: string): ApiError {
  return new ApiError(status, message, code);
}