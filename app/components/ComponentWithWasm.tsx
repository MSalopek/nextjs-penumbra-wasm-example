"use client";

import { SpendKey } from "@buf/penumbra-zone_penumbra.bufbuild_es/penumbra/core/keys/v1/keys_pb";
import React, { useEffect, useMemo, useState } from "react";

const importWasmKeys = import("@penumbra-zone/wasm/keys");

export const ComponentWithWasm = () => {
  const [wasmKeys, loadWasmKeys] = useState<Awaited<
    typeof importWasmKeys
  > | null>(null);
  const [seedPhrase] = useState(
    "benefit cherry cannon tooth exhibit law avocado spare tooth that amount pumpkin scene foil tape mobile shine apology add crouch situate sun business explain",
  );
  const [spendKey, setSpendKey] = useState(new SpendKey());
  useEffect(() => {
    (async () => {
      loadWasmKeys(await importWasmKeys);
    })();
  }, [loadWasmKeys]);
  useEffect(() => {
    if (!wasmKeys) return;
    const spendKey = wasmKeys.generateSpendKey(seedPhrase);
    setSpendKey(spendKey);
  }, [wasmKeys, seedPhrase, setSpendKey]);
  return <>{spendKey?.toJsonString()}</>;
};
