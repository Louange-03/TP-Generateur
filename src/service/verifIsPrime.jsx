// src/service/verifIsPrime.jsx

// Fonction PURE métier : "ce nombre est-il premier ?"
export function isPrime(n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
