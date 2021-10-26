import React from "react";

import { ProjectDetailsType } from "../../../userProject.model";
type viewFormJSONProps = {
  userName: string;
  projectNames: string[];
  projectsDetails: ProjectDetailsType[];
};

const ViewFormJSON: React.FC<viewFormJSONProps> = (props) => {
  const userProjects = {
    userName: props.userName,
    projectNames: props.projectNames,
    projectsDetails: props.projectsDetails,
  };
  return <div>{JSON.stringify(userProjects)}</div>;
};

export default ViewFormJSON;
