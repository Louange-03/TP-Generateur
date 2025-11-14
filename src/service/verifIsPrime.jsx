const primeCache = new Map();

export function verifIsPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;

  if (primeCache.has(n)) return primeCache.get(n);

  if (n === 2) {
    primeCache.set(n, true);
    return true;
  }
  if (n % 2 === 0) {
    primeCache.set(n, false);
    return false;
  }

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) {
      primeCache.set(n, false);
      return false;
    }
  }

  primeCache.set(n, true);
  return true;
}
