export function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve({ message: "Operation timed out" } as T);
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
