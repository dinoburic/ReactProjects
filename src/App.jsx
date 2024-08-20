import { useState } from "react";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";


function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId =  Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks ]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
        setProjectsState(prevState => {
          const projectId =  Math.random();
          const newProject = {
            ...projectData,
            id: projectId
          };
          return {
            ...prevState,
            selectedProjectId: undefined, 
            projects: [
              ...prevState.projects,
              newProject
            ]
          }
        })
  }

  function handleSelectProjectId(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId )
      }
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id ===projectsState.selectedProjectId);

  let content = <SelectedProject 
  tasks={projectsState.tasks}
  onAddTask={handleAddTask} 
  onDeleteTask={handleDeleteTask}
  onDelete={handleDeleteProject} 
  project={selectedProject}/>;
  if(projectsState.selectedProjectId === null) {
    content = <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />
  }
  else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <Sidebar 
      selectedProjectId={projectsState.selectedProjectId}
      onSelectProject={handleSelectProjectId} 
      projects={projectsState.projects} 
      onStartAddProject={handleStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
