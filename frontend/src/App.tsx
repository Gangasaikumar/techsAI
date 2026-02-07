import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid rgba(255, 193, 7, 0.2)",
          },
          success: {
            iconTheme: {
              primary: "#FFC107",
              secondary: "#1e293b",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4d4f",
              secondary: "#1e293b",
            },
          },
        }}
      />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
