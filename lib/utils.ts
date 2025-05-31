import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const UniswapV2Abi = [
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
  },] as const;
