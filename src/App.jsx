import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import SpinnerFullPage from "./Components/SpinnerFullPage";

// import Homepage from "./Pages/Homepage";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";
// import PageNotFound from "./Pages/PageNotFound";

//React.lazy: بيخلّي كل صفحة (Homepage, Product, Pricing …) تتحمل فقط عند الحاجة (لما يفتحها المستخدم).
const Homepage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

// dist/assets/index-bb6669c6.css   30.36 kB │ gzip:   5.09 kB
// dist/assets/index-ff63f28b.js   512.68 kB │ gzip: 149.61 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* Suspense: بيغلف الـ routes كلها، ولما أي صفحة بتكون لسه في التحميل → يبين <SpinnerFullPage /> (Loading UI). */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
