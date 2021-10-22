import React, { useState } from "react";

import UserName from "../UserName/UserName";
import ProjectNames from "../ProjectNames/ProjectNames";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import styles from "./UserProjects.module.scss";

const UserProjects: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [projectNames, setProjectNames] = useState<string[]>([]);

  const setUserNameProps = (userName: string) => {
    setUserName(userName);
  };

  const addNewProjectNameProps = (newProjectName: string) => {
    setProjectNames((prevProjectsNames) => {
      if (!prevProjectsNames.includes(newProjectName)) {
        return [...prevProjectsNames, newProjectName];
      }

      return prevProjectsNames;
    });
  };

  const removeProjectNameProps = (projectNameToRemove: string) => {
    setProjectNames((prevProjectsNames) => {
      const updatedProjectNames = prevProjectsNames.filter(
        (projectName) => projectName !== projectNameToRemove
      );

      return updatedProjectNames;
    });
  };

  return (
    <div className={styles["UserProjects"]}>
      <UserName setUserName={setUserNameProps} />
      <ProjectNames
        projectNames={projectNames}
        addNewProjectName={addNewProjectNameProps}
        removeProjectName={removeProjectNameProps}
      />
      <ProjectDetails />
    </div>
  );
};

export default UserProjects;
