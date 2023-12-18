import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AttendanceComponent = ({ section_id }) => {
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        axios.get(`/get-by-section/${section_id}`)
            .then((res) => {
                setStudents(res.data);
            })
            .catch(e => console.log(e));
    }, [section_id]);

    useEffect(() => {
        if (students.length > 0) {
            setAttendanceData(students);
        }
    }, [students]);

    const handleCheckboxChange = (studentIndex, attendanceIndex) => {
        const updatedStudents = [...students];
        const status = updatedStudents[studentIndex].attendances[attendanceIndex].status;

        updatedStudents[studentIndex].attendances[attendanceIndex].status =
            status === 'Present' ? 'Absent' : 'Present';

        setStudents(updatedStudents);
    };

    const handleNewAttendance = (studentIndex) => {
        const updatedStudents = [...students];
        const currentDate = new Date().toLocaleDateString();
        updatedStudents[studentIndex].attendances.push({ date: currentDate, status: 'Absent' });
        setStudents(updatedStudents);
    };

    const handleSubmit = async () => {
        try {
            const updatedAttendance = students.map((student) => {
                return {
                    student_id: student.id,
                    section_id: student.section_id,
                    attendances: student?.attendances?.map((attendance) => ({
                        date: attendance.date,
                        status: attendance.status,
                        id: attendance.id,
                    })),
                };
            });

            console.log('Updated Attendance:', updatedAttendance);

            const response = await axios.post('/attendance', {
                attendanceData: updatedAttendance,
            });

            console.log('Response:', response.data);

            // Handle success or reset states if needed
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    const renderAttendance = () => {
        return students.map((student, studentIndex) => (
            <div key={student.id}>
                <h3>{student.name}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.attendances.map((attendance, attendanceIndex) => (
                            <tr key={attendance.id}>
                                <td>{attendance.date}</td>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={attendance.status === 'Present'}
                                            onChange={() => handleCheckboxChange(studentIndex, attendanceIndex)}
                                        />
                                        {attendance.status}
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => handleNewAttendance(studentIndex)}>New Attendance</button>
            </div>
        ));
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            {renderAttendance()}
            <button onClick={handleSubmit}>Submit Attendance</button>
        </div>
    );
};

export default AttendanceComponent;
