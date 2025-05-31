import ReadContract from "./readContract";
import TypeDefine from "./typeDefine";
import Viem from "./viem";
import Abi from "./abi";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 w-full max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
      <div className="w-full grid grid-cols-1 gap-6">
        <Abi />
        <Viem />
        <ReadContract />
        <TypeDefine />
      </div>
    </main>
  );
}
