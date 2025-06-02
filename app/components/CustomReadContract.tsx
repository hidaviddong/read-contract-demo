'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { encodeFunctionData, decodeAbiParameters } from 'viem';
import { UniswapV2Abi } from "@/lib/utils";
import type { Abi, AbiFunction, AbiParameter,AbiParameterKind, AbiParametersToPrimitiveTypes, AbiParameterToPrimitiveType, ExtractAbiFunction, ExtractAbiFunctionNames } from "abitype";

export type AbiParametersToNamedPrimitiveTypes<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind
> = {
  [K in abiParameters[number]["name"] & string]: AbiParameterToPrimitiveType<
    Extract<abiParameters[number], { name: K }>,
    abiParameterKind
  >;
};


async function readContract<
  abi extends Abi,
  functionName extends ExtractAbiFunctionNames<abi, "pure" | "view">,
  abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>
>(config: {
  address: `0x${string}`;
  abi: abi;
  functionName: functionName | ExtractAbiFunctionNames<abi, "pure" | "view">;
  args: AbiParametersToPrimitiveTypes<abiFunction["inputs"], "inputs">;
}): Promise<AbiParametersToNamedPrimitiveTypes<abiFunction["outputs"], "outputs">> {
  const functionDef = config.abi.find(
    (item) => item.type === "function" && item.name === config.functionName
  ) as AbiFunction;
  
  if (!functionDef) {
    throw new Error(`Function ${config.functionName} not found in ABI`);
  }
  
  const data = encodeFunctionData({
    abi: [functionDef],
    functionName: config.functionName as string,
    args: config.args,
  });
  
  const response = await fetch("https://eth.llamarpc.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [
        {
          to: config.address,
          data: data,
        },
        "latest",
      ],
    }),
  });
  
  const jsonResult = await response.json() as { result: string; error?: { message: string } };
  
  if (jsonResult.error) {
    throw new Error(`RPC Error: ${jsonResult.error.message}`);
  }
  
  // Decode the return data using viem
  const decodedResults = decodeAbiParameters(
    functionDef.outputs,
    jsonResult.result as `0x${string}`
  );
  
  // Convert to named object
  const namedResult = {} as any;
  functionDef.outputs.forEach((output, index) => {
    if (output.name) {
      namedResult[output.name] = decodedResults[index];
    }
  });
  
  return namedResult;
}

export function CustomReadContract() {
  const [reserves, setReserves] = useState<{
    reserve0: bigint;
    reserve1: bigint;
    blockTimestampLast: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReserves = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await readContract({
        address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',  //Uniswap v2 pair USDC-ETH
        abi: UniswapV2Abi,
        functionName: 'getReserves',
        args: [],
      });
      setReserves(result);
    } catch (error) {
      console.error('Error fetching reserves:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch reserves');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={fetchReserves}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Show Results'}
      </Button>

      {error && (
        <div className="text-sm text-red-500">
          Error: {error}
        </div>
      )}

      {reserves && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Reserve0: {reserves.reserve0.toString()}</p>
          <p className="text-sm text-muted-foreground">Reserve1: {reserves.reserve1.toString()}</p>
          <p className="text-sm text-muted-foreground">BlockTimestampLast: {reserves.blockTimestampLast.toString()}</p>
        </div>
      )}
    </div>
  );
} 