import React, { useState } from "react";
import { nanoid } from "nanoid";

import UserName from "../UserName/UserName";
import ProjectNames from "../ProjectNames/ProjectNames";
import ProjectsDetails from "../ProjectsDetails/ProjectsDetails";
import { ProjectDetailsType } from "../../../userProject.model";
import styles from "./UserProjects.module.scss";

const UserProjects: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [projectNames, setProjectNames] = useState<string[]>([
    "Bank",
    "Tank",
    "Sank",
  ]);
  const [projectsDetails, setProjectsDetails] = useState<ProjectDetailsType[]>([
    {
      id: "1",
      name: "Tank",
      details: "This is a test",
      duration: 10,
      units: "year",
    },
    {
      id: "2",
      name: "Sank",
      details: "This is also a test",
      duration: 20,
      units: "month",
    },
  ]);

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

  const addNewProjectDetailsProps = () => {
    const newProjectDetails: ProjectDetailsType = {
      id: nanoid(),
      name: "",
      details: "",
      duration: 0,
      units: "",
    };

    setProjectsDetails((prevProjectsDetails) => [
      newProjectDetails,
      ...prevProjectsDetails,
    ]);
  };

  const deleteProjectDetailsProps = (id: string) => {
    setProjectsDetails((prevProjectsDetails) =>
      prevProjectsDetails.filter((projectDetails) => projectDetails.id !== id)
    );
  };

  const updateProjectDetailsProps = (
    updatedProjectDetail: ProjectDetailsType
  ) => {
    setProjectsDetails((prevProjectsDetails) => {
      const indexToUpdate = prevProjectsDetails.findIndex(
        (projectDetails) => projectDetails.id === updatedProjectDetail.id
      );

      prevProjectsDetails[indexToUpdate] = updatedProjectDetail;

      return prevProjectsDetails;
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
      <ProjectsDetails
        projectNames={projectNames}
        projectsDetails={projectsDetails}
        addNewProjectDetails={addNewProjectDetailsProps}
        deleteProjectDetails={deleteProjectDetailsProps}
        updateProjectDetails={updateProjectDetailsProps}
      />
    </div>
  );
};

export default UserProjects;
