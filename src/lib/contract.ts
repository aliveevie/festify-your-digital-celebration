export const FESTIFY_CONTRACT = {
  address: '0x822F7cb652befF262Ec5aE9F4203DD066E3174cd' as const,
  chainId: 43114,
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'mintFee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'recipient', type: 'address' },
        { internalType: 'string', name: 'metadataURI', type: 'string' },
        { internalType: 'string', name: 'festival', type: 'string' },
      ],
      name: 'mintGreetingCard',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'sender', type: 'address' },
      ],
      name: 'getSentGreetings',
      outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'recipient', type: 'address' },
      ],
      name: 'getReceivedGreetings',
      outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        { indexed: true, internalType: 'address', name: 'recipient', type: 'address' },
        { indexed: false, internalType: 'string', name: 'festival', type: 'string' },
        { indexed: false, internalType: 'string', name: 'metadataURI', type: 'string' },
      ],
      name: 'GreetingCardMinted',
      type: 'event',
    },
  ] as const,
};
