import React, { useState } from "react";

import UserName from "../UserName/UserName";
import Projects from "../Projects/Projects";
import styles from "./UserProjects.module.scss";

const UserProjects: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [projects, setProjects] = useState<string[]>([]);

  const setUserNameProps = (userName: string) => {
    setUserName(userName);
  };

  const addNewProjectProps = (newProjectName: string) => {
    setProjects((prevProjects) => [...prevProjects, newProjectName]);
  };

  const removeProjectProps = (projectNameToRemove: string) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter(
        (projectName) => projectName !== projectNameToRemove
      );

      return updatedProjects;
    });
  };

  return (
    <div className={styles["UserProjects"]}>
      <UserName setUserName={setUserNameProps} />
      <Projects
        projects={projects}
        addNewProject={addNewProjectProps}
        removeProject={removeProjectProps}
      />
    </div>
  );
};

export default UserProjects;
