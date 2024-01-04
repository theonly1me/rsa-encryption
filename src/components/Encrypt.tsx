'use client';
import { useState, useRef } from 'react';
import { MdOutlineCopyAll } from "react-icons/md";


const Encrypt = () => {
  const publicKeyRef = useRef<HTMLTextAreaElement>(null);
  const plainTextRef = useRef<HTMLTextAreaElement>(null);
  const [encryptedData, setEncryptedData] = useState<ArrayBuffer>();

  const handleEncrypt = async ()  => {

    try {
      const publicKeyString = publicKeyRef.current?.value.split(String.raw`\n`).join('\n');

      const publicKey = await importPublicKey(publicKeyString as string);
    
    
      const plaintext = plainTextRef.current?.value;
  
  
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        publicKey, // from generateKey or importKey above
        Buffer.from(plaintext as string, 'utf-8') // ArrayBuffer of data you want to encrypt
      );
  
      setEncryptedData(encryptedData);
    } catch (error: unknown) {
      // @ts-ignore
      console.error('An error occurred during encryption', error.stack);
    }
  }

  const importPublicKey = async (publicKeyPEM: string) => {
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';

    // Extract the key content from PEM format
    const keyContent = publicKeyPEM
        .replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\s/g, '');

    // Convert base64-encoded key to ArrayBuffer
    const keyBuffer = Uint8Array.from(atob(keyContent), c => c.charCodeAt(0)).buffer;

    // Import the key as CryptoKey
    const publicKey = await crypto.subtle.importKey(
        'spki',
        keyBuffer,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        true,
        ['encrypt']
    );

    return publicKey;
}

const copyValue = (value: ArrayBuffer) => {
  navigator.clipboard.writeText(btoa(String.fromCharCode(...new Uint8Array(value as ArrayBuffer))));
}

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 p-8 bg-black">
      <h1 className="text-white text-5xl font-semibold">RSA Encryption</h1>
      <div className="flex-col flex md:flex-row items-center justify-evenly w-full">
        <div className="px-2 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="publicKey">Public key</label>
            <textarea className="text-neutral-900 p-2 text-sm" id="publicKey" rows={4} cols={50} ref={publicKeyRef} value={publicKeyRef.current?.value} placeholder="Enter public key here..." />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="plaintext" className="text-white">Text to encrypt</label>
            <textarea id="plaintext" className="text-neutral-900 p-2 text-sm" rows={4} cols={50} ref={plainTextRef} value={plainTextRef.current?.value} placeholder="Enter text to encrypt..." />
          </div>
          <button onClick={handleEncrypt} className='py-4 px-1 border-2 text-white text-xl'>Encrypt</button>
        </div>
        <div className="text-white max-w-sm break-words min-h-96 flex flex-col gap-2">
          <div className="flex gap-2">
            <label htmlFor="result" className="text-white">Encrypted value</label> 
            <MdOutlineCopyAll className="text-2xl text-gray-500 hover:text-gray-300 active:text-gray-100 cursor-pointer" onClick={() => copyValue(encryptedData as ArrayBuffer)}/>
          </div>
          <textarea id="result" className="p-2 min-h-72 min-w-96 text-neutral-700 text-sm" defaultValue={btoa(String.fromCharCode(...new Uint8Array(encryptedData as ArrayBuffer)))}/>
        </div>
      </div>
      </div>
  )
}

export default Encrypt;