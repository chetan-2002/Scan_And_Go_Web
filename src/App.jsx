import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "../routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
