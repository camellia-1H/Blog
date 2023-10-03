import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRoutes, privateRoutes } from "./routes";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="bg-white">
      <Suspense fallback={<Loader />}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component as NonNullable<
              React.LazyExoticComponent<React.ComponentType<any>>
            >;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              ></Route>
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component as React.LazyExoticComponent<React.FC>;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
