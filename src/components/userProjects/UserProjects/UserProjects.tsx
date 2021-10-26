import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import UserName from "../UserName/UserName";
import ProjectNames from "../ProjectNames/ProjectNames";
import ProjectsDetails from "../ProjectsDetails/ProjectsDetails";
import { ProjectDetailsType } from "../../../userProject.model";
import styles from "./UserProjects.module.scss";

const UserProjects: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [projectsDetails, setProjectsDetails] = useState<ProjectDetailsType[]>(
    []
  );

  useEffect(() => {
    const userNameLocalStorage = localStorage.getItem("userName");
    if (userNameLocalStorage) {
      setUserName(userNameLocalStorage);
    }

    const projectNamesLocalStorageString = localStorage.getItem("projectNames");
    if (projectNamesLocalStorageString) {
      const projectNamesLocalStorage: string[] = JSON.parse(
        projectNamesLocalStorageString
      );

      setProjectNames(projectNamesLocalStorage);
    }

    const projectsDetailsLocalStorageString =
      localStorage.getItem("projectsDetails");
    if (projectsDetailsLocalStorageString) {
      const projectsDetailsLocalStorage: ProjectDetailsType[] = JSON.parse(
        projectsDetailsLocalStorageString
      );

      setProjectsDetails(projectsDetailsLocalStorage);
    }
  }, []);

  const setUserNameProps = (userName: string) => {
    setUserName(userName);
    localStorage.setItem("userName", userName);
  };

  const addNewProjectNameProps = (newProjectName: string) => {
    setProjectNames((prevProjectsNames) => {
      if (!prevProjectsNames.includes(newProjectName)) {
        const updatedProjectNames: string[] = [
          ...prevProjectsNames,
          newProjectName,
        ];

        localStorage.setItem(
          "projectNames",
          JSON.stringify(updatedProjectNames)
        );

        return updatedProjectNames;
      }

      return prevProjectsNames;
    });
  };

  const removeProjectNameProps = (projectNameToRemove: string) => {
    setProjectNames((prevProjectsNames) => {
      const updatedProjectNames = prevProjectsNames.filter(
        (projectName) => projectName !== projectNameToRemove
      );

      localStorage.setItem("projectNames", JSON.stringify(updatedProjectNames));

      return updatedProjectNames;
    });

    setProjectsDetails((prevProjectsDetails) => {
      for (let index = 0; index < prevProjectsDetails.length; index++) {
        const projectDetails = prevProjectsDetails[index];

        if (projectDetails.name === projectNameToRemove) {
          prevProjectsDetails[index].name = "";
        }
      }

      localStorage.setItem(
        "projectsDetails",
        JSON.stringify(prevProjectsDetails)
      );

      return prevProjectsDetails;
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

    setProjectsDetails((prevProjectsDetails) => {
      const updatedProjectsDetails = [
        newProjectDetails,
        ...prevProjectsDetails,
      ];

      localStorage.setItem(
        "projectsDetails",
        JSON.stringify(updatedProjectsDetails)
      );

      return updatedProjectsDetails;
    });
  };

  const deleteProjectDetailsProps = (id: string) => {
    setProjectsDetails((prevProjectsDetails) => {
      const updatedProjectsDetails = prevProjectsDetails.filter(
        (projectDetails) => projectDetails.id !== id
      );

      localStorage.setItem(
        "projectsDetails",
        JSON.stringify(updatedProjectsDetails)
      );

      return updatedProjectsDetails;
    });
  };

  const updateProjectDetailsProps = (
    updatedProjectDetail: ProjectDetailsType
  ) => {
    setProjectsDetails((prevProjectsDetails) => {
      const indexToUpdate = prevProjectsDetails.findIndex(
        (projectDetails) => projectDetails.id === updatedProjectDetail.id
      );

      prevProjectsDetails[indexToUpdate] = updatedProjectDetail;

      localStorage.setItem(
        "projectsDetails",
        JSON.stringify(prevProjectsDetails)
      );

      return prevProjectsDetails;
    });
  };

  return (
    <div className={styles["UserProjects"]}>
      <UserName userName={userName} setUserName={setUserNameProps} />
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
