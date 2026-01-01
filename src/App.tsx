import { createHashRouter, createBrowserRouter } from "react-router";
import { RouterProvider, Link } from "react-router";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">
    <nav className="mb-4 space-x-4">
      <Link to="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <Link to="/about" className="text-blue-600 hover:underline">
        About
      </Link>
      <Link to="/contact" className="text-blue-600 hover:underline">
        Contact
      </Link>
    </nav>
    {children}
  </div>
);

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <div className="text-sm">Bas van Driel - Home</div>
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <div className="text-sm">About Page</div>
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <div className="text-sm">Contact Page</div>
      </Layout>
    ),
  },
];

const router =
  import.meta.env.VITE_USE_HASH_ROUTER === "true"
    ? createHashRouter(routes)
    : createBrowserRouter(routes, {
        basename: "/react-router-gh-pages-integration",
      });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
