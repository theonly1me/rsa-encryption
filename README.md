# RSA Encryption using Web Crypto API

This is a simple demonstration on using the (WebCrypto API)[https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API] to generate a public & private keypair, perform client side RSA encryption & decryption. **For educational purpose only.**

### What is RSA Encryption?

RSA, named after its inventors Ron Rivest, Adi Shamir, and Leonard Adleman, is a widely adopted public-key cryptography algorithm that plays a crucial role in securing digital communication. Unlike traditional symmetric-key algorithms, where a single key is used for both encryption and decryption, RSA employs a pair of keys: a public key and a private key.

The public key is shared openly, allowing anyone to encrypt messages, but only the possessor of the corresponding private key can decrypt them. This asymmetric nature of RSA makes it particularly suited for secure communication over untrusted networks. The strength of RSA lies in the difficulty of factoring the product of two large prime numbers, forming the basis of the keys.

When someone wishes to send a confidential message, they use the recipient's public key to encrypt it. The encrypted message, even if intercepted, remains unreadable without the recipient's private key. This elegant approach addresses key distribution challenges faced by symmetric-key systems, providing a robust solution for secure data exchange on the internet.

RSA encryption is widely employed in various applications, including secure web browsing, digital signatures, and the establishment of secure communication channels. Its mathematical foundation, grounded in number theory, ensures a high level of security, making RSA a cornerstone in the realm of modern cryptography.

Understanding RSA encryption is fundamental for grasping the principles behind secure online communication, ensuring the confidentiality and integrity of sensitive information exchanged in the digital landscape.

## Encryption Details

- **Algorithm:** RSA (Rivest–Shamir–Adleman) with Optimal Asymmetric Encryption Padding (OAEP).
- **Key Length:** 4096 bits.
- **Hash Algorithm:** SHA-256.

## Features

- **Generate Keypair:** Easily generate a new RSA keypair for encryption and decryption.
- **RSA Encryption:** Encrypt a text message using a provided public key.
- **RSA Decryption:** Decrypt an encrypted message using a provided private key.

## Technologies Used

- React
- Next.js
- TypeScript
- Web Crypto API
- TailwindCSS

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/theonly1me/rsa-encryption.git
   ```

2. Have fun :D
