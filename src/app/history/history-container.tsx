'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function HistoryContainer() {
  const [evmAddress, setEvmAddress] = useState('');
  const [evmError, setEvmError] = useState('');

  const handleEvmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEvm = evmAddress.trim();
    
    if (!trimmedEvm) {
      setEvmError('ウォレットアドレスを入力してください');
      return;
    }
    
    setEvmError('');
    console.log('EVM Address:', trimmedEvm);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Wallet Address History</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">EVM</h2>
        <form onSubmit={handleEvmSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="evm-address">EVM Address</Label>
            <Input
              id="evm-address"
              type="text"
              placeholder="Enter wallet address"
              value={evmAddress}
              onChange={(e) => {
                setEvmAddress(e.target.value);
                if (evmError) setEvmError('');
              }}
            />
          </div>

          {evmError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
              {evmError}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={!evmAddress.trim()}>
            送信
          </Button>
        </form>
      </div>
    </div>
  );
}
