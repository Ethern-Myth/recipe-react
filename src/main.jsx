import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Authorize } from "@lib/authorize";
import { Interceptor } from "@middleware/interceptor";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
//
// CSS IMPORTS
import "@styles/index.css";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

// DECLARATIONS
const queryClient = new QueryClient();
Interceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Authorize>
			<QueryClientProvider client={queryClient}>
				<App />
				<ToastContainer />
			</QueryClientProvider>
		</Authorize>
	</BrowserRouter>
);
