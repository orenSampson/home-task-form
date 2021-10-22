import React, { useRef } from "react";
import { nanoid } from "nanoid";

type ProjectsProps = {
  projectNames: string[];
  addNewProjectName: (newProjectName: string) => void;
  removeProjectName: (projectName: string) => void;
};

const Projects: React.FC<ProjectsProps> = (props) => {
  const projectNameInputRef = useRef<HTMLInputElement>(null);

  const onKeyDownHandler = (event: { key: string }) => {
    if (event.key !== "Enter") {
      return;
    }

    const projectName = projectNameInputRef.current!.value;

    props.addNewProjectName(projectName);

    projectNameInputRef.current!.value = "";
  };

  const projectNamesList = props.projectNames.map((projectName) => (
    <li
      key={nanoid()}
      onClick={props.removeProjectName.bind(null, projectName)}
    >
      {projectName}
    </li>
  ));

  return (
    <div>
      <h2>Projects</h2>
      <div>
        <input
          onKeyDown={onKeyDownHandler}
          type="text"
          id="projectName"
          required
          ref={projectNameInputRef}
        />
      </div>
      <ul>{projectNamesList}</ul>
    </div>
  );
};

export default Projects;
