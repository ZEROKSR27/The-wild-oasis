import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DMpro } from "./contexts/DMcontext";
import GoogleCallback from "./features/authentication/Google";
function App() {
    const QC = new QueryClient();
    return (
        <DMpro>
            <QueryClientProvider client={QC}>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to="Dashboard" />}
                            />
                            <Route path="Dashboard" element={<Dashboard />} />
                            <Route path="Bookings" element={<Bookings />} />
                            <Route
                                path="Bookings/:bookingId"
                                element={<Booking />}
                            />
                            <Route
                                path="checkin/:bookingId"
                                element={<CheckIn />}
                            />
                            <Route path="Cabins" element={<Cabins />} />
                            <Route path="Users" element={<Users />} />
                            <Route path="Settings" element={<Settings />} />
                            <Route path="Account" element={<Account />} />
                        </Route>
                        <Route path="Login" element={<Login />} />
                        <Route
                            path="auth/google"
                            element={<GoogleCallback />}
                        />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>

                <Toaster
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 7000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "600px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                            borderRadius: "100px",
                        },
                    }}
                    gutter={12}
                    position="top-center"
                />
            </QueryClientProvider>
        </DMpro>
    );
}

export default App;
