import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <>
        Hola Mundo
      </>
    </QueryClientProvider>
  );
}

export default App;
