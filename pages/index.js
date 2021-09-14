import Head from 'next/head'
import { 
  Box,
  Container, 
  HStack,
  Icon,
  Input, 
  Switch,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';
import { NftProvider } from 'use-nft';
import { getDefaultProvider, Contract } from 'ethers';
import Nft from '../components/Nft';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Home() {
  const toast = useToast();
  const { toggleColorMode } = useColorMode();
  const [developerId, setDeveloperId] = useState(1);

  const handleDeveloperId = (event) => {
    let devValue = Number.parseInt(event.target.value);
    if(!Number.isNaN(devValue) && devValue < 8000 && devValue > -1){
      updateDeveloperId(devValue);
    }else{
      toast({
        title: 'Invalid Dev',
        description: 'Please use a number in the range 1 - 8000',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  const updateDeveloperId = useCallback((newValue) => setDeveloperId(newValue), [developerId]);
  const ethersConfig = {
    ethers: { Contract },
    provider: getDefaultProvider('homestead')
  };

  return (
    <>
      <Head>
        <title>Dev Visualization</title>
        <meta name="description" content="Developer DAO Dev NFT Visualization" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" alignItems="start" justifyContent="end" mr="6" mt="1">
        <HStack>
          <Icon as={FiSun} />
          <Switch 
            onChange={toggleColorMode} 
            size="lg" 
            aria-label="Light or Dark Mode Toggle"
            />
          <Icon as={FiMoon} />
        </HStack>
      </Box>
      

      <Container maxW="xl" centerContent>
        <Box maxW="sm" borderwidth="1px" borderRadius="lg">
          <Text mb="8px">Search developer ID</Text>
          <Input
            placeholder="Search Developer ID"
            value={developerId}
            onChange={handleDeveloperId}
            size="lg"
          />
        </Box>

        <Box maxW="lg" borderWidth="1px" borderRadius="lg">
          <NftProvider fetcher={['ethers', ethersConfig]}>
            <Nft developerId={developerId} />
          </NftProvider>
        </Box>
      </Container>
    </>
  )
}

export const getStaticProps = async (context) => {
  return {
    props: { developerId: 1 }
  }
}
