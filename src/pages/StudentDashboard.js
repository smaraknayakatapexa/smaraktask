import React, { useState, useEffect } from "react";
import "../App.css";
import Modal from "react-modal";
import axios from "../axios";

function StudentDashboard() {
  const [searchText, setSearchText] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState({
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    studentEmail: "",
    studentContactNumber: "",
    studentBirthdate: "",
    studentGender: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const headers = {
      "auth-token": localStorage.getItem("token"),
    };

    axios
      .get("/api/student/get-students", { headers })
      .then((response) => {
        if (response.data.status == 200) {
          setStudentData(response.data.data);
        } else if (response.data.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  function handleChangeData(evt) {
    const value = evt.target.value;

    setData({
      ...data,
      [evt.target.name]: value,
    });
  }

  const deleteStudent = (id) => {
    const headers = {
      "auth-token": localStorage.getItem("token"),
    };
    axios
      .delete("/api/student/delete-student/" + id, { headers })
      .then((response) => {
        if (response.data.status == 200) {
          getData();
        } else {
          window.alert(response.data.message);
        }
      });
  };

  const saveData = () => {
    if (edit) {
      let obj = {
        ...data,
        id: id,
      };

      const headers = {
        "auth-token": localStorage.getItem("token"),
      };

      axios
        .post("/api/student/update-student", obj, { headers })
        .then((response) => {
          if (response.data.status == 200) {
            setAddStudentModal(false);
            setData({
              studentFirstName: "",
              studentMiddleName: "",
              studentLastName: "",
              studentEmail: "",
              studentContactNumber: "",
              studentBirthdate: "",
              studentGender: "",
            });

            getData();
          } else if (response.data.status == 400) {
            window.alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      const headers = {
        "auth-token": localStorage.getItem("token"),
      };
      axios
        .post("/api/student/add-new-student", data, { headers })
        .then((response) => {
          if (response.data.status == 200) {
            setAddStudentModal(false);
            setData({
              studentFirstName: "",
              studentMiddleName: "",
              studentLastName: "",
              studentEmail: "",
              studentContactNumber: "",
              studentBirthdate: "",
              studentGender: "",
            });

            getData();
          } else if (response.data.status == 400) {
            window.alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <div>
      <div className="search">
        <input
          placeholder="Search"
          value={searchText}
          className="input-search"
          onChange={(e) => setSearchText(e.target.value)}
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
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
          {studentData
            .filter((item) => {
              console.log(item);
              if (searchText === "") {
                return item;
              } else if (
                item.studentFirstName
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                item.studentMiddleName
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                item.studentLastName
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                item.studentEmail
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.studentFirstName}</td>
                  <td>{item.studentMiddleName}</td>
                  <td>{item.studentLastName}</td>
                  <td>{item.studentEmail}</td>
                  <td>{item.studentContactNumber}</td>
                  <td>{item.studentBirthdate}</td>
                  <td>{item.studentGender}</td>
                  <td>
                    <button
                      style={{ border: "none" }}
                      className="button-login"
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit(true);

                        setId(item._id);
                        setData({
                          studentFirstName: item.studentFirstName,
                          studentMiddleName: item.studentMiddleName,
                          studentLastName: item.studentLastName,
                          studentEmail: item.studentEmail,
                          studentContactNumber: item.studentContactNumber,
                          studentBirthdate: item.studentBirthdate,
                          studentGender: item.studentGender,
                        });

                        setAddStudentModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "red", border: "none" }}
                      className="button-login"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteStudent(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>

      <Modal
        isOpen={addStudentModal}
        onRequestClose={() => setAddStudentModal(false)}
        style={{ width: "50%" }}
      >
        <div style={{ display: "flex", width: "50%", flexDirection: "column" }}>
          <input
            placeholder="First Name"
            name="studentFirstName"
            value={data.studentFirstName}
            onChange={handleChangeData}
          />
          <input
            placeholder="Middle Name"
            name="studentMiddleName"
            value={data.studentMiddleName}
            onChange={handleChangeData}
          />
          <input
            placeholder="Last Name"
            name="studentLastName"
            value={data.studentLastName}
            onChange={handleChangeData}
          />
          <input
            placeholder="Email"
            type={"email"}
            name="studentEmail"
            value={data.studentEmail}
            onChange={handleChangeData}
          />
          <input
            placeholder="Contact Number"
            type={"tel"}
            name="studentContactNumber"
            value={data.studentContactNumber}
            onChange={handleChangeData}
          />
          <input
            placeholder="Birth Date"
            type={"date"}
            name="studentBirthdate"
            value={data.studentBirthdate}
            onChange={handleChangeData}
          />
          <select
            style={{ margin: 5 }}
            name="studentGender"
            value={data.studentGender}
            onChange={handleChangeData}
          >
            <option defaultChecked>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button
            style={{ margin: 5 }}
            className="button-login"
            onClick={(e) => {
              e.preventDefault();
              saveData();
            }}
          >
            Submit
          </button>

          <button
            style={{ backgroundColor: "red", border: "none" }}
            className="button-login"
            onClick={() => {
              setAddStudentModal(false);
              setData({
                studentFirstName: "",
                studentMiddleName: "",
                studentLastName: "",
                studentEmail: "",
                studentContactNumber: "",
                studentBirthdate: "",
                studentGender: "",
              });
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default StudentDashboard;
