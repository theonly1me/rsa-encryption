"use client";

import { useRef } from "react";
import { useStore } from "./store";

const StoreInitializer: React.FC<{
  publicKey: string;
  privateKey: string;
}> = ({ publicKey, privateKey }) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useStore.setState({
      publicKey: publicKey,
      privateKey: privateKey,
    });

    initialized.current = true;
  }

  return null;
};

export default StoreInitializer;
