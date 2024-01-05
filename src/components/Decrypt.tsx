'use client';
import { MdOutlineCopyAll } from "react-icons/md";
import { useState, useRef } from 'react';

const Decrypt = () => {
  const privateKeyRef = useRef<HTMLTextAreaElement>(null);
  const plainTextRef = useRef<HTMLTextAreaElement>(null);
  const [decryptedData, setDecryptedData] = useState<ArrayBuffer>();

  const handleDecrypt = async ()  => {
    try {

      const privateKey = await importPrivateKey(privateKeyRef.current?.value as string);
      window.crypto.subtle.decrypt('RSA-OAEP', privateKey, Uint8Array.from(atob(plainTextRef.current?.value as string), c => c.charCodeAt(0)).buffer).then((decrypted) => {
        setDecryptedData(decrypted);
      });
    } catch (error: unknown) {
      // @ts-ignore
      console.error('An error occurred during decryption', error.stack);
    }
  }

  const importPrivateKey = async (privateKeyPEM: string) => {
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';

    // Extract the key content from PEM format
    const keyContent = privateKeyPEM
        .replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\s/g, '');

    // Convert base64-encoded key to ArrayBuffer
    const keyBuffer = Uint8Array.from(atob(keyContent), c => c.charCodeAt(0)).buffer;

    // Import the key as CryptoKey
    const privateKey = await crypto.subtle.importKey(
        'pkcs8',
        keyBuffer,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['decrypt']
    );

    return privateKey;
}

const copyValue = (value: ArrayBuffer) => {
  navigator.clipboard.writeText(btoa(String.fromCharCode(...new Uint8Array(value as ArrayBuffer))));
} 

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 p-8 bg-black">
      <h1 className="text-white text-5xl font-semibold">RSA Decryption</h1>
      <div className="flex-col flex md:flex-row items-center justify-evenly w-full">
        <div className="px-2 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="publicKey">Private key</label>
            <textarea className="text-neutral-900 p-2 text-sm" id="publicKey" rows={4} cols={50} ref={privateKeyRef} value={privateKeyRef.current?.value} placeholder="Enter private key here..." />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="plaintext" className="text-white">Text to decrypt</label>
            <textarea id="plaintext" className="text-neutral-900 p-2 text-sm" rows={4} cols={50} ref={plainTextRef} value={plainTextRef.current?.value} placeholder="Enter text to encrypt..." />
          </div>
          <button onClick={handleDecrypt} className='py-4 px-1 border-2 text-white text-xl'>Decrypt</button>
        </div>
        <div className="text-white max-w-sm break-words min-h-96 flex flex-col gap-2 px-2 py-4">
          <div className="flex gap-2">
            <label htmlFor="result" className="text-white">Decrypted value</label> 
            <MdOutlineCopyAll className="text-2xl text-gray-500 hover:text-gray-300 active:text-gray-100 cursor-pointer" onClick={() => copyValue(decryptedData as ArrayBuffer)}/>
          </div>
          <textarea id="result" className="p-2 min-h-72 min-w-96 text-neutral-700 text-sm" readOnly defaultValue={atob(btoa(String.fromCharCode(...new Uint8Array(decryptedData as ArrayBuffer))))}/>
        </div>
      </div>
      </div>
  )
}

export default Decrypt;