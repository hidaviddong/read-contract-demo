'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { UniswapV2Abi } from "@/lib/utils";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

export function ReservesFetcher() {
  const [reserves, setReserves] = useState<[bigint, bigint, number] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReserves = async () => {
    try {
      setLoading(true);
      const result = await publicClient.readContract({
        address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',  //Uniswap v2 pair USDC-ETH
        abi: UniswapV2Abi,
        functionName: 'getReserves',
        args: [],
      });
      setReserves(result as [bigint, bigint, number]);
    } catch (error) {
      console.error('Error fetching reserves:', error);
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

      {reserves && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Reserve0: {reserves[0].toString()}</p>
          <p className="text-sm text-muted-foreground">Reserve1: {reserves[1].toString()}</p>
          <p className="text-sm text-muted-foreground">BlockTimestampLast: {reserves[2].toString()}</p>
        </div>
      )}
    </div>
  );
} 