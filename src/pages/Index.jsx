import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Input, Button, Text, useToast, Divider, HStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaTable } from "react-icons/fa";

// Mock data for keyword data, replace with actual API call
const keywordDataMock = [
  { keyword: "React", impressions: 1000, clicks: 100, ctr: 10, captured_date: "2023-04-01" },
  { keyword: "Chakra UI", impressions: 800, clicks: 80, ctr: 10, captured_date: "2023-04-01" },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [keywordData, setKeywordData] = useState(keywordDataMock);
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    // Call the /signup endpoint with userData
    toast({ title: "Signup successful. Please log in.", status: "success" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Call the /login endpoint with userData
    setIsLoggedIn(true);
    toast({ title: "Logged in successfully.", status: "success" });
  };

  const fetchKeywordData = async () => {
    // Call the /keyword_data/{keyword} endpoint to fetch keyword data
    setKeywordData(keywordDataMock); // Replace with actual API data
  };

  return (
    <ChakraProvider>
      <VStack spacing={8} p={5}>
        <Heading>Interactive API Site</Heading>
        {!isLoggedIn ? (
          <>
            <VStack as="form" w="300px" spacing={4} onSubmit={handleSignup}>
              <Input placeholder="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              <Input placeholder="Password" type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
              <Button type="submit" leftIcon={<FaUserPlus />} colorScheme="teal">
                Signup
              </Button>
            </VStack>
            <Divider />
            <VStack as="form" w="300px" spacing={4} onSubmit={handleLogin}>
              <Input placeholder="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              <Input placeholder="Password" type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
              <Button type="submit" leftIcon={<FaSignInAlt />} colorScheme="green">
                Login
              </Button>
            </VStack>
          </>
        ) : (
          <Box w="100%">
            <Heading size="lg">Dashboard</Heading>
            <Button leftIcon={<FaTable />} colorScheme="blue" onClick={fetchKeywordData}>
              Load Keyword Data
            </Button>
            <Table variant="simple" mt={4}>
              <Thead>
                <Tr>
                  <Th>Keyword</Th>
                  <Th isNumeric>Impressions</Th>
                  <Th isNumeric>Clicks</Th>
                  <Th isNumeric>CTR</Th>
                  <Th>Captured Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {keywordData.map((data, index) => (
                  <Tr key={index}>
                    <Td>{data.keyword}</Td>
                    <Td isNumeric>{data.impressions}</Td>
                    <Td isNumeric>{data.clicks}</Td>
                    <Td isNumeric>{data.ctr}</Td>
                    <Td>{data.captured_date}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </ChakraProvider>
  );
};

export default Index;
