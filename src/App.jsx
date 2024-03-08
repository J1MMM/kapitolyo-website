// ch6ang5es h6append 
import Layout from "./components/Layout";
import {
  Navigate,
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import ROLES_LIST from "./components/ROLES_LIST";
import LoginComponenet from "./components/Login/index";
import ResetPassword from "./components/resetPassword";
import VerifyResetToken from "./components/VerifyResetToken";
import UserArchive from "./components/UserArchive";
import ClientList from "./components/ClientList";
import Violations from "./components/Violations";
import ClientsPage from "./components/ClientsPage";
import ArchivedList from "./components/ArchivedList";
import PaidList from "./components/PaidList";
import ViolationsPage from "./components/ViolationsPage"
import ReleasedTCT from "./components/ReleasedTCT";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {/* public routes  */}
        <Route path="/login" element={<LoginComponenet />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* reset password  */}
        <Route element={<VerifyResetToken />}>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        {/* protected routes  */}
        <Route path="/" element={<Layout />}>
          {/* admin and teaches allowed  */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES_LIST.SuperAdmin,
                  ROLES_LIST.Admin,
                  ROLES_LIST.CTMO1,
                ]}
              />
            }
          >
            <Route path="/" element={<Dashboard />} />
          </Route>
          {/* only Admin allowed  */}
          <Route
            element={<RequireAuth allowedRoles={[ROLES_LIST.SuperAdmin]} />}
          >
            <Route path="user-archive" element={<UserArchive />} />
          </Route>

          {/* only teachers are allowed on this route  */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.CTMO1]}
              />
            }
          >
            <Route path='violations' element={<Navigate to={'list'} replace />} />
            <Route path="violations" element={<ViolationsPage />} >
              <Route path='list' element={<Violations />} />
              <Route path='paidlist' element={<PaidList />} />
              <Route path='released' element={<ReleasedTCT />} />
            </Route>
            
            <Route path='clients' element={<Navigate to={'list'} replace />} />
            <Route path='clients' element={<ClientsPage />}>
              <Route path='list' element={<ClientList />} />
              <Route path='archive' element={<ArchivedList />} />
            </Route>



          </Route>
          {/* catch all  */}
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
