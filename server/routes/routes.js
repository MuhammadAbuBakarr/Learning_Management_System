const express = require("express");
const router = express.Router();
require("../database/connection");

// Date Controller
const { postdate, getAll } = require("../controllers/DateControllers");
// Student Controllers
const {
	signUpAsStudent,
	loginStudent,
	deleteAllStudents,
	deleteSingleStudent,
	getStudent,
} = require("../controllers/studentControllers");

// Admin/Teacher Controllers
const {
	signUpAsAdminTeacher,
	loginAdminTeacher,
	getTeachers,
	deleteAllTeachers,
	deleteTeacher,
} = require("../controllers/AdminTeacherControllers");
// Attendance Controllers
const {
	markPresent,
	deleteAllAttendance,
	getAttendance,
	findAtten,
} = require("../controllers/attendanceControllers");
// Subject Controllers
const {
	postSubject,
	getSubject,
	deleteAllSubjects,
	deleteSubject,
} = require("../controllers/subjectControllers");
// Class Controllers
const {
	addClass,
	getAllClasses,
	deleteClass,
} = require("../controllers/classControllers");

// Test Controllers
const {
	postTest,
	getTest,
	deleteTests,
	getTestByStudent,
	getTestById,
} = require("../controllers/TestControllers");

// Admin/Teacher Routes
router.post("/admin", signUpAsAdminTeacher);
router.post("/loginAdmin", loginAdminTeacher);
router.get("/admin", getTeachers);
router.delete("/admin", deleteAllTeachers);
router.delete("/admin/:id", deleteTeacher);

// Student Routes
router.post("/student", signUpAsStudent);
router.get("/student", getStudent);
router.post("/login", loginStudent);
router.delete("/student", deleteAllStudents);
router.delete("/student/:_id", deleteSingleStudent);

// Attendance Routes
router.post("/attendance", markPresent);
router.delete("/attendance", deleteAllAttendance);
router.get("/attendance", getAttendance);
router.get("/atten", findAtten);

//Subject Routes
router.post("/subject", postSubject);
router.get("/subject", getSubject);
router.delete("/subject", deleteAllSubjects);
router.delete("/subject/:id", deleteSubject);

//Class Routes
router.post("/class", addClass);
router.get("/class", getAllClasses);
router.delete("/class/:_id", deleteClass);

// Test Routes
router.post("/test", postTest);
router.post("/gettest", getTest);
router.get("/teststu", getTestByStudent);
router.delete("/test", deleteTests);
router.get("/test/:_id", getTestById);

// DateRoutes
router.post("/date", postdate);
router.get("/date", getAll);

//////////////////////////////////
module.exports = router;
