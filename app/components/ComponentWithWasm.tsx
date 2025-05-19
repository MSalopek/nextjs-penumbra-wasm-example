"use client";

import {
  Address,
  FullViewingKey,
  SpendKey,
} from "@penumbra-zone/protobuf/penumbra/core/keys/v1/keys_pb";
import { bech32mAddress } from "@penumbra-zone/bech32m/penumbra";

import React, { useEffect, useState } from "react";

const importWasmKeys = import("@penumbra-zone/wasm/keys");

export const ComponentWithWasm = () => {
  const [wasmKeys, loadWasmKeys] = useState<Awaited<
    typeof importWasmKeys
  > | null>(null);
  const [seedPhrase] = useState(
    "benefit cherry cannon tooth exhibit law avocado spare tooth that amount pumpkin scene foil tape mobile shine apology add crouch situate sun business explain"
  );
  const [spendKey, setSpendKey] = useState(new SpendKey());
  const [viewingKey, setViewingKey] = useState(new FullViewingKey());
  const [address, setAddress] = useState(new Address());
  const [bech32, setBech32] = useState("");
  useEffect(() => {
    (async () => {
      loadWasmKeys(await importWasmKeys);
    })();
  }, [loadWasmKeys]);

  useEffect(() => {
    if (!wasmKeys) return;
    const spendKey = wasmKeys.generateSpendKey(seedPhrase);
    setSpendKey(spendKey);
    const viewingKey = wasmKeys.getFullViewingKey(spendKey);
    const address = wasmKeys.getAddressByIndex(viewingKey, 0);
    const bech = bech32mAddress(address);

    setViewingKey(viewingKey);
    setAddress(address);
    setBech32(bech);
  }, [wasmKeys, seedPhrase, setSpendKey]);

  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Spend Key</h2>
        <p className="max-w-4xl break-all">{JSON.stringify(spendKey)}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Viewing Key</h2>
        <p className="max-w-4xl break-all">{JSON.stringify(viewingKey)}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Address</h2>
        <p className="max-w-4xl break-all">{JSON.stringify(address)}</p>
        <h2 className="text-lg font-bold">Bech32</h2>
        {address && bech32 && <p className="max-w-4xl break-all">{bech32}</p>}
      </div>
    </div>
  );
};
