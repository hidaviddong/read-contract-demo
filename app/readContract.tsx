import { CodeBlock } from '@/components/ui/code-block'
import { CustomReadContract } from './components/CustomReadContract'

export default function Page() {
  return (
    <main className='flex w-full flex-col gap-4 rounded-lg p-3 sm:p-4 border border-gray-200 overflow-hidden'>
      <h2 className="text-xl sm:text-2xl font-bold break-words">Implementation 2: Using Custom Read Contract</h2>
      <div className="w-full overflow-x-auto">
        <CodeBlock lang="ts">
          {`
import type { Abi,AbiFunction,AbiParametersToPrimitiveTypes,ExtractAbiFunction,ExtractAbiFunctionNames } from "abitype";
import type { AbiParametersToNamedPrimitiveTypes } from "./types";
import { encodeFunctionData, decodeAbiParameters } from 'viem'


async function readContract<
  abi extends Abi,
  functionName extends ExtractAbiFunctionNames<abi, "pure" | "view">,
  abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>
>(config: {
  address: \`0x\${string}\`;
  abi: UniswapV2Abi;
  functionName: functionName | ExtractAbiFunctionNames<abi, "pure" | "view">;
  args: AbiParametersToPrimitiveTypes<abiFunction["inputs"], "inputs">;
}): Promise<AbiParametersToNamedPrimitiveTypes<abiFunction["outputs"], "outputs">> {
  const functionDef = config.abi.find(
    (item) => item.type === "function" && item.name === config.functionName
  ) as AbiFunction;
  
  if (!functionDef) {
    throw new Error(\`Function \${config.functionName} not found in ABI\`);
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
    throw new Error(\`RPC Error: \${jsonResult.error.message}\`);
  }
  
  // Decode the return data using viem
  const decodedResults = decodeAbiParameters(
    functionDef.outputs,
    jsonResult.result as \`0x\${string}\`
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

const reservesResult2 = await readContract({
  address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',  //Uniswap v2 pair USDC-ETH
  abi: myAbi,
  functionName: 'getReserves',
  args: [],
});

console.log('Reserve0:', reservesResult2.reserve0.toString());
console.log('Reserve1:', reservesResult2.reserve1.toString());
console.log('BlockTimestampLast:', reservesResult2.blockTimestampLast.toString());
          `}
        </CodeBlock>
      </div>

      <CustomReadContract />
    </main>
  )
}

