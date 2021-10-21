import React, { useRef } from "react";
import { nanoid } from "nanoid";

type ProjectsProps = {
  projects: string[];
  addNewProject: (newProjectName: string) => void;
  removeProject: (projectName: string) => void;
};

const Projects: React.FC<ProjectsProps> = (props) => {
  const projectNameInputRef = useRef<HTMLInputElement>(null);

  const onKeyDownHandler = (event: { key: string }) => {
    if (event.key !== "Enter") {
      return;
    }

    const projectName = projectNameInputRef.current!.value;

    props.addNewProject(projectName);

    projectNameInputRef.current!.value = "";
  };

  const projectNameList = props.projects.map((projectName) => (
    <li key={nanoid()} onClick={props.removeProject.bind(null, projectName)}>
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
      <ul>{projectNameList}</ul>
    </div>
  );
};

export default Projects;
