import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AttendanceComponent = ({ section_id }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/get-by-section/${section_id}`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchData();

    }, [section_id]);

    const handleCheckboxChange = (studentIndex, attendanceIndex) => {
        const updatedStudents = [...students];
        const status = updatedStudents[studentIndex].attendances[attendanceIndex].status;

        updatedStudents[studentIndex].attendances[attendanceIndex].status =
            status === 'Present' ? 'Absent' : 'Present';

        setStudents(updatedStudents);
    };

    const handleNewAttendance = (studentIndex) => {
        const updatedStudents = students.map((student, index) => {
            if (index === studentIndex) {
                return {
                    ...student,
                    attendances: [
                        ...student.attendances,
                        { date: new Date().toLocaleDateString(), status: 'Absent' },
                    ],
                };
            }
            return student;
        });
    
        setStudents(updatedStudents);
    };
    
    
    
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async () => {
        try {
            const updatedAttendance = students.map((student) => {
                return {
                    student_id: student.id,
                    section_id: student.section_id,
                    attendances: student?.attendances?.map((attendance) => ({
                        date: formatDate(attendance.date),
                        status: attendance.status,
                        id: attendance.id || null, 
                    })),
                };
            });

            const response = await axios.post('/attendance', {
                attendanceData: updatedAttendance,
            });

            setStudents([]); // Reset the state to an empty array
            const freshData = await axios.get(`/get-by-section/${section_id}`);
            setStudents(freshData.data);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderAttendance = () => {
        return students.map((student, studentIndex) => (
            <div key={student.id} className="my-6">
                <h3 className="text-lg font-bold mb-2">{student.name}</h3>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.attendances.map((attendance, attendanceIndex) => (
                            <tr key={attendanceIndex} className="bg-white">
                                <td className="border px-4 py-2">{attendance.date}</td>
                                <td className="border px-4 py-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={attendance.status === 'Present'}
                                            onChange={() => handleCheckboxChange(studentIndex, attendanceIndex)}
                                            className="mr-2"
                                        />
                                        {attendance.status}
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => handleNewAttendance(studentIndex)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    New Attendance
                </button>
            </div>
        ));
    };
    

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>
            {renderAttendance()}
            <button
                onClick={handleSubmit}
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit Attendance
            </button>
        </div>
    );
};

export default AttendanceComponent;
