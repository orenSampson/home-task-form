import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";

import UserName from "../UserName/UserName";
import ProjectNames from "../ProjectNames/ProjectNames";
import ProjectsDetails from "../ProjectsDetails/ProjectsDetails";
import { ProjectDetailsType } from "../../../userProject.model";
import ViewFormJSON from "../ViewFormJSON/ViewFormJSON";

const UserProjects: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [projectsDetails, setProjectsDetails] = useState<ProjectDetailsType[]>(
    []
  );
  const [viewFormJSON, setViewFormJSON] = useState(false);

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

  //User Name related methods
  const setUserNameProps = (userName: string) => {
    setUserName(userName);
    localStorage.setItem("userName", userName);
  };

  const checkUserNameNotValid = (userNameParam: string) => {
    if (!userNameParam) {
      setUserNameErrorMsg("required");
    }
  };

  const checkUserNameValid = (userNameParam: string) => {
    if (userNameParam) {
      setUserNameErrorMsg("");
    }
  };

  //Project Names Related Projects
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

  //Project Details Related Projects
  const addNewProjectDetailsProps = () => {
    const newProjectDetails: ProjectDetailsType = {
      id: nanoid(),
      name: "",
      nameErrorMsg: "",
      details: "",
      detailsErrorMsg: "",
      duration: 0,
      durationErrorMsg: "",
      units: "",
      unitsErrorMsg: "",
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

  const checkProjectNameNotValid = (id: string, projectName: string) => {
    if (!projectName) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].nameErrorMsg = "please select a project";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectNameValid = (id: string, projectName: string) => {
    if (projectName) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].nameErrorMsg = "";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectDetailsNotValid = (id: string, projectDetails: string) => {
    if (!projectDetails) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].detailsErrorMsg = "required";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectDetailsValid = (id: string, projectDetails: string) => {
    if (projectDetails) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].detailsErrorMsg = "";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectDurationNotValid = (
    id: string,
    projectDuration: number
  ) => {
    if (!projectDuration) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].durationErrorMsg = "required";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectDurationValid = (id: string, projectDuration: number) => {
    if (projectDuration) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].durationErrorMsg = "";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectUnitsNotValid = (id: string, projectUnits: string) => {
    if (!projectUnits) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].unitsErrorMsg = "required";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const checkProjectUnitsValid = (id: string, projectUnits: string) => {
    if (projectUnits) {
      setProjectsDetails((prevProjectsDetails) => {
        const i = prevProjectsDetails.findIndex(
          (prevProjectDetails) => prevProjectDetails.id === id
        );

        if (i < 0) {
          return prevProjectsDetails;
        }

        prevProjectsDetails[i].unitsErrorMsg = "";

        prevProjectsDetails = [...prevProjectsDetails];

        return prevProjectsDetails;
      });
    }
  };

  const onSaveHandler = () => {
    //check user name
    checkUserNameNotValid(userName);

    //check all project details
    projectsDetails.forEach((projectDetails) => {
      checkProjectNameNotValid(projectDetails.id, projectDetails.name);
      checkProjectDetailsNotValid(projectDetails.id, projectDetails.details);
      checkProjectDurationNotValid(projectDetails.id, projectDetails.duration);
      checkProjectUnitsNotValid(projectDetails.id, projectDetails.units);
    });
  };

  const onclickviewFromJSONHandler = () => {
    setViewFormJSON((prevViewFormJSON) => !prevViewFormJSON);
  };

  const viewFormJSONFalse = (
    <form>
      <UserName
        userName={userName}
        setUserName={setUserNameProps}
        checkUserNameNotValid={checkUserNameNotValid}
        checkUserNameValid={checkUserNameValid}
        userNameErrorMsg={userNameErrorMsg}
      />
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
        checkProjectNameNotValid={checkProjectNameNotValid}
        checkProjectNameValid={checkProjectNameValid}
        checkProjectDetailsNotValid={checkProjectDetailsNotValid}
        checkProjectDetailsValid={checkProjectDetailsValid}
        checkProjectDurationNotValid={checkProjectDurationNotValid}
        checkProjectDurationValid={checkProjectDurationValid}
        checkProjectUnitsNotValid={checkProjectUnitsNotValid}
        checkProjectUnitsValid={checkProjectUnitsValid}
      />
      <button type="button" onClick={onSaveHandler}>
        Save
      </button>
    </form>
  );

  const viewFormJSONTrue = (
    <ViewFormJSON
      userName={userName}
      projectNames={projectNames}
      projectsDetails={projectsDetails}
    />
  );

  return (
    <Fragment>
      {!viewFormJSON ? viewFormJSONFalse : viewFormJSONTrue}
      <button onClick={onclickviewFromJSONHandler}>
        {!viewFormJSON ? "View Form JSON" : "Show form"}
      </button>
    </Fragment>
  );
};

export default UserProjects;
