import { CodeBlock } from "@/components/ui/code-block";

export default function Page() {
  return (
    <main className='flex w-full flex-col gap-4 rounded-lg p-4 border border-gray-200'>
    <h2 className="text-2xl font-bold">Custom Type Define</h2>
    <div className="w-full overflow-x-auto">
    <CodeBlock lang="ts">
        {
            `
import type { AbiParameter, AbiParameterKind, AbiParameterToPrimitiveType, AbiParameterToPrimitiveType } from "abitype";

export type AbiParametersToNamedPrimitiveTypes<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind
> = {
  [K in abiParameters[number]["name"] & string]: AbiParameterToPrimitiveType<
    Extract<abiParameters[number], { name: K }>,
    abiParameterKind
  >;
};

/** 
abiParameters[number] = 
[
  { internalType: "uint112", name: "reserve0", type: "uint112" },
  { internalType: "uint112", name: "reserve1", type: "uint112" },
  { internalType: "uint32", name: "blockTimestampLast", type: "uint32" }
] 


 abiParameters[number]["name"]" = "reserve0" | "reserve1" | "blockTimestampLast"

 
 if K = "reserve0":
 Extract<abiParameters[number], { name: "reserve0" }> = { internalType: "uint112", name: "reserve0", type: "uint112" }

 AbiParameterToPrimitiveType<> will generate javascript type: bigint
**/
        `
        }
      </CodeBlock>
    </div>
     
    </main>
  )
}
