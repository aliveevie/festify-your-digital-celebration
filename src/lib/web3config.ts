import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { avalanche, avalancheFuji } from '@reown/appkit/networks';

const projectId = '2c36ad052ffbb4d42ea115856c0fa089';

const metadata = {
  name: 'Festify',
  description: 'NFT Greeting Cards on Avalanche',
  url: 'https://festify.club',
  icons: ['/favicon.png'],
};

const networks = [avalanche, avalancheFuji] as const;

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8B5CF6',
    '--w3m-border-radius-master': '3px',
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
