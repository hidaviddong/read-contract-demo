import { CodeBlock } from "@/components/ui/code-block";
import { ReservesFetcher } from "./components/ReservesFetcher";
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export default function Viem() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg p-3 sm:p-4 border border-gray-200 overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold break-words">Implementation 1: Using viem's publicClient</h2>
      <div className="w-full overflow-x-auto">
        <CodeBlock lang="ts"
        decorations={[
            {
              start: { line: 14, character: 0 },
              end: { line: 17, character: 66 },
              properties: { class: 'bg-yellow-100' }
            }
          ]}
        >
          {`import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

const reservesResult1 = await publicClient.readContract({
  address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',  //Uniswap v2 pair USDC-ETH
  abi: UniswapV2Abi,
  functionName: 'getReserves',
  args: [],
});

console.log('Reserve0:', reservesResult1[0].toString());
console.log('Reserve1:', reservesResult1[1].toString());
console.log('BlockTimestampLast:', reservesResult1[2].toString());`}
        </CodeBlock>
      </div>

      <ReservesFetcher />
    </div>
  );
}