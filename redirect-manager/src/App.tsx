import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import RedirectManager from "./components/RedirectManager";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RedirectManager />
			<Toaster position="top-right" />
		</QueryClientProvider>
	);
}

export default App;
