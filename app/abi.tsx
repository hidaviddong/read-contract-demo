import { CodeBlock } from "@/components/ui/code-block";

export default function Page() {
  return (
    <main className='flex flex-col w-full gap-4 rounded-lg p-4 border border-gray-200'>
    <h2 className="text-2xl font-bold">Our ABI</h2>
      <CodeBlock lang="ts">
        {
            `
const UniswapV2Abi = [
    {
      name: "getReserves",
      inputs: [],
      outputs: [
        {
          internalType: "uint112",
          name: "reserve0",
          type: "uint112",
        },
        {
          internalType: "uint112",
          name: "reserve1",
          type: "uint112",
        },
        {
          internalType: "uint32",
          name: "blockTimestampLast",
          type: "uint32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
] as const;
  
            `      }
      </CodeBlock>
    </main>
  )
}
