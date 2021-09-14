import React from 'react';
import { useNft } from 'use-nft';
import { Box } from '@chakra-ui/react';

export default function Nft(developerId) {
  
  // prevent runtime errors by ensuring this only renders in browser
  // problem is caused by useNft not being defined for typing without the Provider
  if(!process.browser) return <Box>Loading...</Box>;

  const { loading, error, nft } = useNft(
    '0x25ed58c027921E14D86380eA2646E3a1B5C55A8b',
    developerId.developerId
  );

  const processBase64Img = (imgStr) => {
    const [formatInfo, base64Str] = imgStr.split(',');
  
    // The smart contract includes items with unescaped "&", which breaks SVG rendering
    const processedStr = atob(base64Str).replace(' & ', ' &amp; ');
  
    return formatInfo + ',' + btoa(processedStr);
  };

  if(loading) return <Box>Loading...</Box>;

  if(!developerId.developerId) return <Box>Enter developer ID</Box>;

  if(error || !nft) return <Box>Error</Box>

  return (
    <Box>
      <img src={nft.image} />
      <h1>{nft.name}</h1>
      <h2>Owner: {nft.owner || 'Unclaimed'}</h2>
    </Box>
  )
}

export const getStaticProps = async (context) => ({
  props: {
    developerId: { developerId: 1}
  }
});