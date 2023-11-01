// import { Suspense } from "react";
// import { useLoaderData, useOutlet, Await } from "react-router-dom";
// import { AuthProvider } from "../hooks/useAuth";

// export const AuthLayout = () => {
//   const outlet = useOutlet();

//   const { userPromise } = useLoaderData() as { userPromise: Promise<any> };

//   return (
//     <Suspense fallback={<p>Carregando</p>}>
//       <Await
//         resolve={userPromise}
//         errorElement={<p>Algo deu errado!</p>}
//         children={(user) => (
//           <AuthProvider userData={user}>{outlet}</AuthProvider>
//         )}
//       />
//     </Suspense>
//   );
// };
