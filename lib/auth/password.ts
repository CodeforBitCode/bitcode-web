import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const algorithm = "scrypt";
const keyLength = 64;
const saltLength = 16;
const cost = 16_384;
const blockSize = 8;
const parallelization = 5;
const maxMemory = 64 * 1024 * 1024;
const dummySalt = Buffer.from("BitCodeAuthDummy", "utf8");
const dummyKey = Buffer.alloc(keyLength);

function deriveKey(password: string, salt: Buffer) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(
      password,
      salt,
      keyLength,
      { N: cost, r: blockSize, p: parallelization, maxmem: maxMemory },
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      },
    );
  });
}

export async function hashPassword(password: string) {
  const salt = randomBytes(saltLength);
  const derivedKey = await deriveKey(password, salt);
  return [
    algorithm,
    cost,
    blockSize,
    parallelization,
    salt.toString("base64url"),
    derivedKey.toString("base64url"),
  ].join("$");
}

export async function verifyPassword(password: string, encodedHash: string) {
  const [name, encodedCost, encodedBlockSize, encodedParallelization, salt, key] =
    encodedHash.split("$");

  if (
    name !== algorithm ||
    Number(encodedCost) !== cost ||
    Number(encodedBlockSize) !== blockSize ||
    Number(encodedParallelization) !== parallelization ||
    !salt ||
    !key
  ) {
    return false;
  }

  try {
    const storedKey = Buffer.from(key, "base64url");
    if (storedKey.length !== keyLength) return false;
    const derivedKey = await deriveKey(password, Buffer.from(salt, "base64url"));
    return timingSafeEqual(storedKey, derivedKey);
  } catch {
    return false;
  }
}

export async function consumePasswordVerificationTime(password: string) {
  const derivedKey = await deriveKey(password, dummySalt);
  timingSafeEqual(derivedKey, dummyKey);
}
