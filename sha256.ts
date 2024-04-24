import crypto from "crypto"

export function sha256(input: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}