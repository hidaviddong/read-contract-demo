import { CodeBlock } from "@/components/ui/code-block";

export default function Page() {
  return (
    <main className='flex w-full flex-col gap-4 rounded-lg p-4 border border-gray-200'>
    <h2 className="text-2xl font-bold">Custom Type Define</h2>
    <div className="w-full overflow-x-auto">
    <CodeBlock lang="ts">
        {
            `
import type { AbiParameter, AbiParameterKind, AbiParameterToPrimitiveType } from "abitype";

export type AbiParametersToNamedPrimitiveTypes<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind
> = {
  [K in abiParameters[number]["name"] & string]: AbiParameterToPrimitiveType<
    Extract<abiParameters[number], { name: K }>,
    abiParameterKind
  >;
};
            `
        }
      </CodeBlock>
    </div>
     
    </main>
  )
}
