import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import UserProjectsPage from "./pages/UserProjectsPage/UserProjectsPage";

const App: React.FC = () => {
  return (
    <div>
      <ReactNotification />
      <UserProjectsPage />
    </div>
  );
};

export default App;
