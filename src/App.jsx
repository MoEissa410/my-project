import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Product from "./components/Product";
import CartItem from "./components/headerContainer/CartItem";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import SearchResults from "./components/SearchResults";
import Credit from "./components/Credit";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about-us" element={<AboutUs />} />

              <Route path="/product/:id" element={<Product />} />
              <Route path="/cartItem" Component={CartItem} />
              <Route path="/credit" Component={Credit} />
              <Route path="*" element={<PageNotFound />} />

              <Route path="/search-results" Component={SearchResults} />

              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
