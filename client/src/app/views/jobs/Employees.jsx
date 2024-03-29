import React from "react";
import Jobs_List from "./Jobs_List";

const Employees = () => {
  const jobs = [
    {
      id: 1,
      title: "Web Designer",
      jobType: "Part Time",
      duration: "6 months",
      salary: 25000,
      deadline: "2024-04-15T18:00:00.000+00:00",
      maxApplicant: 5,
      position: 1,
      description: "Create visually appealing website layouts.",
      skills: ["HTML", "CSS", "Photoshop"],
    },
    {
      id: 2,
      title: "Python Developer",
      jobType: "Remote",
      duration: "Indefinite",
      salary: 35000,
      deadline: "2024-03-25T10:00:00.000+00:00",
      maxApplicant: 8,
      position: 3,
      description: "Develop backend systems using Python.",
      skills: ["Python", "Django", "RESTful API"],
    },
    {
      id: 4,
      title: "Mobile App Developer",
      jobType: "Contract",
      duration: "3 months",
      salary: 3000,
      deadline: "2024-03-22T16:45:00.000+00:00",
      maxApplicant: 4,
      position: 1,
      description: "Develop cross-platform mobile applications.",
      skills: ["React Native", "Java", "Swift"],
    },
  ];

  return (
    <>
      <Jobs_List jobs={jobs} title={"Employees"} />
    </>
  );
};

export default Employees;
