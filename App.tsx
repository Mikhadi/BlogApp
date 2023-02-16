import { AuthProvider } from "./Contexts/AuthContext";
import { Router } from "./Routes/Router";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
