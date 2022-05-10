import React, { useState } from "react";
import "../App.css";
import Modal from "react-modal";

function StudentDashboard() {
  const [searchText, setSearchText] = useState();
  const [addStudentModal, setAddStudentModal] = useState(false);

  const studentData = [
    {
      id: 1,
      studentFirstName: "Smarak",
      studentMiddleName: "Jeet",
      studentLastName: "Nayak",
      studentEmail: "smarak@gmail.com",
      studentContactNumber: "+919501202963",
      studentBirthdate: "30-09-1997",
      studentGender: "Male",
    },
    {
      id: 2,
      studentFirstName: "Smarak",
      studentMiddleName: "Jeet",
      studentLastName: "Nayak2",
      studentEmail: "smarak2@gmail.com",
      studentContactNumber: "+919501202964",
      studentBirthdate: "30-09-1998",
      studentGender: "Male",
    },
  ];

  return (
    <div>
      <div className="search">
        <input
          placeholder="Search"
          value={searchText}
          className="input-search"
        ></input>
        <button className="button-search">Search</button>
        <button
          className="button-search"
          style={{ marginLeft: 10 }}
          onClick={() => setAddStudentModal(true)}
        >
          Add New Student
        </button>
      </div>

      <div className="search">
        <h2>Student data</h2>

        <table>
          <tr>
            <th>ID</th>
            <th>studentFirstName</th>
            <th>studentMiddleName</th>
            <th>studentLastName</th>
            <th>studentEmail</th>
            <th>studentContactNumber</th>
            <th>studentBirthdate</th>
            <th>studentGender</th>
            <th>Actions</th>
          </tr>
          {studentData.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.studentFirstName}</td>
                <td>{item.studentMiddleName}</td>
                <td>{item.studentLastName}</td>
                <td>{item.studentEmail}</td>
                <td>{item.studentContactNumber}</td>
                <td>{item.studentBirthdate}</td>
                <td>{item.studentGender}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <Modal
        isOpen={addStudentModal}
        onRequestClose={() => setAddStudentModal(false)}
        contentLabel="Add new student"
      >
        <button onClick={() => setAddStudentModal(false)}>close</button>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <input placeholder="First Name" />
          <input placeholder="Middle Name" />
          <input placeholder="Last Name" />
          <input placeholder="Email" type={"email"} />
          <input placeholder="Contact Number" type={"tel"} />
          <input placeholder="Birth Date" type={"date"} />
          <select style={{ margin: 5 }}>
            <option defaultChecked>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <button style={{ margin: 5 }}>Submit</button>
        </div>
      </Modal>
    </div>
  );
}

export default StudentDashboard;
