export async function tryWithFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await primary();
  } catch (primaryError) {
    console.error('Primary AI model failed:', primaryError);
    try {
      return await fallback();
    } catch (fallbackError) {
      console.error('Fallback AI model failed:', fallbackError);
      throw new Error(errorMessage);
    }
  }
}