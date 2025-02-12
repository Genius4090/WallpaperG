import "./styles/App.css";
import Home from "./pages/Home";
import TripList from "./components/TripList";
import About from './pages/About';  // Add this import
import Pagenotfound from "./pages/Pagenotfound";
import ProfilePage from './components/ProfilePage'; // Import ProfilePage
import Pixel from "./pages/Pixel";
import 'animate.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";


function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="cards" element={<TripList />} />
        <Route path="about" element={<About />} />
        {/* Add ProfilePage route here */}
        <Route path="pixel" element={<Pixel />} />
        <Route path="profile" element={<ProfilePage />} />

      </Route>
    )
  );

  return (
    <div className="App">
        <RouterProvider router={routes} />
    
    </div>
  );
}

export default App;
