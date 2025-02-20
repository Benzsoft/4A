export function getCachedItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const { value, timestamp } = JSON.parse(item);
  const now = new Date().getTime();

  // Check if 24 hours have passed
  if (now - timestamp > 24 * 60 * 60 * 1000) {
    localStorage.removeItem(key);
    return null;
  }

  return value;
}

export function setCachedItem<T>(key: string, value: T): void {
  const item = {
    value,
    timestamp: new Date().getTime()
  };
  localStorage.setItem(key, JSON.stringify(item));
}