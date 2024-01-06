"use client";
import { useState, useEffect } from "react";
import { MdOutlineCopyAll } from "react-icons/md";

const Encrypt = () => {
  const [encryptedData, setEncryptedData] = useState<ArrayBuffer>();
  const [publicKey, setPublicKey] = useState<string>();
  const [plainText, setPlainText] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const keyPair = localStorage.getItem("keyPair");
    if (keyPair) {
      const { publicKey } = JSON.parse(keyPair);
      setPublicKey(publicKey);
    }
  }, []);

  const handleEncrypt = async () => {
    try {
      const spki = await importPublicKey(publicKey as string);

      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        spki,
        Buffer.from(plainText as string, "utf-8")
      );

      setEncryptedData(encryptedData);
    } catch (e) {
      setErrorMessage("Public key specified is invalid.");
    }
  };

  const importPublicKey = async (publicKeyPEM: string) => {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";

    const keyContent = publicKeyPEM
      .replace(pemHeader, "")
      .replace(pemFooter, "")
      .replace(/\s/g, "");

    const keyBuffer = Uint8Array.from(decodeBase64ToString(keyContent), c =>
      c.charCodeAt(0)
    ).buffer;

    const publicKey = await crypto.subtle.importKey(
      "spki",
      keyBuffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"]
    );

    return publicKey;
  };

  const copyValue = (value: ArrayBuffer) => {
    navigator.clipboard.writeText(
      btoa(String.fromCharCode(...new Uint8Array(value as ArrayBuffer)))
    );
  };

  const generateKeyPair = async () => {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        modulusLength: 4096,
        name: "RSA-OAEP",
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );

    const [spkiBuffer, pkcs8Buffer] = await Promise.all([
      window.crypto.subtle.exportKey("spki", keyPair.publicKey),
      window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey),
    ]);

    const publicKey = btoa(String.fromCharCode(...new Uint8Array(spkiBuffer)));
    const privateKey = btoa(
      String.fromCharCode(...new Uint8Array(pkcs8Buffer))
    );

    setPublicKey(publicKey);
    setErrorMessage("");

    localStorage.setItem("keyPair", JSON.stringify({ publicKey, privateKey }));
  };

  const decodeBase64ToString = (base64Data: string) => {
    try {
      return atob(base64Data);
    } catch (error) {
      return "Public key specified is invalid.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-12 p-8 bg-black">
      <h1 className="text-white text-5xl font-semibold">RSA Encryption</h1>
      <div className="flex-col flex md:flex-row items-center justify-evenly w-80 md:w-full">
        <div className="px-2 py-4 flex flex-col gap-4 max-w-full">
          <div className="flex flex-col gap-2">
            <label className="text-white" htmlFor="publicKey">
              Public key
            </label>
            <p className="text-neutral-300 flex gap-1 text-sm">
              Don&apos;t have a keypair?
              <span>
                <span
                  onClick={generateKeyPair}
                  className="underline cursor-pointer text-neutral-300 hover:text-neutral-200 active:text-neutral-50 transition-all duration-300"
                >
                  Generate a new one
                </span>
                .
              </span>
            </p>
            <textarea
              className="text-neutral-900 p-2 text-sm"
              id="publicKey"
              rows={4}
              cols={50}
              value={publicKey}
              onChange={e => {
                setPublicKey(e.target.value.split(String.raw`\n`).join("\n"));
                setErrorMessage("");
              }}
              placeholder="Enter public key here..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="plaintext" className="text-white">
              Text to encrypt
            </label>
            <textarea
              id="plaintext"
              className="text-neutral-900 p-2 text-sm"
              rows={4}
              cols={50}
              value={plainText}
              onChange={e => setPlainText(e.target.value)}
              placeholder="Enter text to encrypt..."
            />
          </div>
          <button
            onClick={handleEncrypt}
            className="py-4 px-1 border-2 text-white text-xl"
          >
            Encrypt
          </button>
        </div>
        <div className="text-white max-w-sm break-words min-h-96 flex flex-col gap-2 px-2 py-4">
          <div className="flex gap-2">
            <label htmlFor="result" className="text-white">
              Encrypted value
            </label>
            <MdOutlineCopyAll
              className="text-2xl text-gray-500 hover:text-gray-300 active:text-gray-100 cursor-pointer"
              onClick={() => copyValue(encryptedData as ArrayBuffer)}
            />
          </div>
          <p className="text-red-400 text-sm">{errorMessage}</p>
          <textarea
            id="result"
            className="p-2 min-h-72 min-w-80 md:min-w-96 text-neutral-700 text-sm"
            placeholder="Encrypted value will appear here..."
            readOnly
            defaultValue={btoa(
              String.fromCharCode(
                ...new Uint8Array(encryptedData as ArrayBuffer)
              )
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Encrypt;
