import React, { useState, useEffect } from "react";
import "../App.css";
import Modal from "react-modal";
import axios from "../axios";

function StudentDashboard() {
  const [searchText, setSearchText] = useState();
  const [studentDatas, setStudentDatas] = useState([]);
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
    axios
      .get("/api/student/getStudents")
      .then((response) => {
        if (response.data.status == 200) {
          setStudentDatas(response.data.data);
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
    axios.delete("/api/student/deleteStudent/" + id).then((response) => {
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

      axios
        .post("/api/student/updateStudent", obj)
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
      axios
        .post("/api/student/addNewStudent", data)
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
          {studentDatas.map((item, index) => {
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
        contentLabel="Add new student"
      >
        <button
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
          close
        </button>

        <div style={{ display: "flex", flexDirection: "column" }}>
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
            onClick={(e) => {
              e.preventDefault();
              saveData();
            }}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default StudentDashboard;
