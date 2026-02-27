import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#00d4ff";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box>
      <HStack mb={3} spacing={2}>
        <Text fontSize={{ base: "10px", sm: "xs", md: "sm" }} fontWeight="600" color="#888" textTransform="uppercase">
          Language
        </Text>
        <Badge bg="#00d4ff" color="#000" fontSize={{ base: "10px", sm: "xs" }} fontWeight="bold">
          {language.toUpperCase()}
        </Badge>
      </HStack>
      <Menu isLazy>
        <MenuButton
          as={Button}
          w="full"
          bg="#000000"
          color="#00d4ff"
          border="2px solid #00d4ff"
          _hover={{
            bg: "#111111",
            boxShadow: "0 0 16px rgba(0, 212, 255, 0.4)",
          }}
          _active={{
            bg: "#2563eb",
            color: "white",
          }}
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="600"
          borderRadius="6px"
          textTransform="capitalize"
          rightIcon={<ChevronDownIcon boxSize={{ base: 4, sm: 5 }} />}
        >
          {language}
        </MenuButton>
        <MenuList
          bg="#000000"
          border="2px solid #00d4ff"
          borderRadius="6px"
          maxH="300px"
          overflowY="auto"
          _focus={{ outline: "none" }}
          minW={{ base: "150px", sm: "200px" }}
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              bg={lang === language ? "#2563eb" : "transparent"}
              color={lang === language ? "white" : "#e0e0e0"}
              fontWeight={lang === language ? "700" : "500"}
              _hover={{
                bg: lang === language ? "#1d4ed8" : "#111111",
                color: lang === language ? "white" : "#00d4ff",
              }}
              onClick={() => onSelect(lang)}
              cursor="pointer"
              borderRadius="4px"
              mx={2}
              my={1}
              fontSize={{ base: "xs", sm: "sm" }}
            >
              <HStack w="full" spacing={{ base: 2, sm: 3 }}>
                <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="600" textTransform="capitalize">
                  {lang}
                </Text>
                <Text fontSize={{ base: "10px", sm: "xs" }} color={lang === language ? "white" : "#888"}>
                  v{version}
                </Text>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
export default LanguageSelector;