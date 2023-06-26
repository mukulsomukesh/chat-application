import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import Signup from "./routes/Signup";

function App() {
  return (
    <div className="h-screen overflow-hidden">

      <Navbar />
      <AllRoutes />

    </div>
  );
}

export default App;
