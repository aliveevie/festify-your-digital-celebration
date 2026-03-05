import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { defineChain } from 'viem';

const projectId = '2c36ad052ffbb4d42ea115856c0fa089';

const avalanche = defineChain({
  id: 43114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Snowtrace', url: 'https://snowtrace.io' },
  },
});

const avalancheFuji = defineChain({
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
    public: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Snowtrace', url: 'https://testnet.snowtrace.io' },
  },
  testnet: true,
});

const metadata = {
  name: 'Festify',
  description: 'NFT Greeting Cards on Avalanche',
  url: 'https://festify.club',
  icons: ['/favicon.png'],
};

const chains = [avalanche, avalancheFuji] as const;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8B5CF6',
    '--w3m-border-radius-master': '12px',
  },
});
