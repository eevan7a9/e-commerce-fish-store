// For testing with delay
export async function createMockRequest<T>(
  testData: T,
  timeout: number = 2000
): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testData), timeout);
  });
}
