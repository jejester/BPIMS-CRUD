import React, { useEffect, useState } from 'react'
import axiosClient from '../AxiosClient'
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialog from '../Components/DeleteDialog';
import SearchIcon from '@mui/icons-material/Search';
import AddEmployeeDialog from '../Components/AddEmployeeDialog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Home() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage]  = useState(5); // Number of items per page

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        axiosClient.get('/employees').then((response) => {
            if (response.status === 200) {
                setEmployees(response.data);
            } else {
                console.error('Error getting employees:', response);
            }
        }).catch((err) => {
            console.error('Error getting employees:', err);
        });
    };

    // Filter employees by search term
    const filteredEmployees = employees.filter((employee) => {
        return employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
            employee.email.toLowerCase().includes(search.toLowerCase()) ||
            employee.contactNumber.toLowerCase().includes(search.toLowerCase());
    });

    const handleEmployeeAdded = (newEmployee) => {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    };

    // Pagination Logic
    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePaginationNumber = (e) => {
        const selectedValue = parseInt(e.target.value, 10); // Convert value to a number
        setItemsPerPage(selectedValue);
        setCurrentPage(1); // Reset to the first page whenever items per page changes
    };

    return (
        
        <div className="bg-gray-100 dark:bg-slate-900 transition-colors duration-300 p-10 min-h-screen">

            {/*add employee button */}              
            <div className="flex items-center justify-end mb-5">
                <AddEmployeeDialog onEmployeeAdded={handleEmployeeAdded}/>
            </div>

            {/*search and select how pagination number*/}
            <div className="mb-5 flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                    <select
                        name="pagination"
                        onChange={handlePaginationNumber}
                        className="px-4 py-2 rounded-md bg-white dark:bg-slate-800 dark:text-white border border-gray-300 dark:border-slate-700 focus:outline-none"
                        value={itemsPerPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <label className='font-workSans dark:text-white' htmlFor="pagination">entries per page</label>
                </div>
                <div className="flex items-center">
                <SearchIcon className="text-gray-500 dark:text-white" />
                <input
                    type="text"
                    placeholder="Search employees..."
                    className="w-full px-4 py-2 rounded-md bg-white dark:bg-slate-800 dark:text-white border border-gray-300 dark:border-slate-700 focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>

            {/*emp tables */}
            <div className="overflow-x-auto bg-white dark:bg-slate-800 transition-colors duration-300 shadow-md rounded-lg">
                <table className="min-w-full table-auto text-center text-sm text-gray-800 dark:text-white">
                    <thead className="bg-gray-200 dark:bg-slate-700 transition-colors duration-300 text-center">
                        <tr className='font-workSans text-md md:text-lg tracking-tighter'>
                            <th className="py-6 px-4"></th>
                            <th className="py-6 px-4">First Name</th>
                            <th className="px-4">Last Name</th>
                            <th className="px-4">Email</th>
                            <th className="px-4">Phone</th>
                            <th className="px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.length > 0 ? (
                            currentEmployees.map((employee) => (
                                <tr key={employee.id} className="border-b font-workSans text-md border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
                                    <td className="py-3 px-4 flex items-center justify-center">
                                        {
                                            employee.imagePath ? (<img className='rounded-full m-10 md:m-0 h-10 md:h-20 shadow-md' src={`http://localhost:5000${employee.imagePath}`} alt="User Image" />)
                                            : <img className='rounded-full m-10 md:m-0 h-10 md:h-20 shadow-md' src='/uploads/default_user.png' alt="User Image" />
                                        }
                                    </td>
                                    <td className="py-3 px-4">{employee.firstName}</td>
                                    <td className="py-3 px-4">{employee.lastName}</td>
                                    <td className="py-3 px-4">{employee.email}</td>
                                    <td className="py-3 px-4">{employee.contactNumber}</td>
                                    <td className="py-3 px-4 lg:space-x-3">
                                        {/*update and delete Buttons */}
                                        <EditIcon
                                            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-500 cursor-pointer hover:drop-shadow-md" 
                                            onClick={() => console.log('Update', employee.id)}/>
                                        <DeleteDialog 
                                            id={employee.id} 
                                            onDeleteSuccess={(deletedId) => {
                                                {/*removes the deleted employee from the state*/}
                                                setEmployees((prevEmployees) => 
                                                    prevEmployees.filter((emp) => emp.id !== deletedId)
                                                );
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-3 px-4 text-center text-gray-500">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="7">                             
                                {/*pagination buttons */}
                                <div className="flex items-center justify-end mt-5 p-5 w-full">
                                    <button
                                        className="font-workSans px-4 py-2 mx-2 bg-gray-300 dark:bg-slate-700 dark:text-white rounded-md hover:bg-gray-400 disabled:bg-gray-200"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    <span className="font-workSans text-lg text-gray-700 dark:text-white">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        className="font-workSans px-4 py-2 mx-2 bg-gray-300 dark:bg-slate-700 dark:text-white rounded-md hover:bg-gray-400 disabled:bg-gray-200"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}> Next
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    );
}

export default Home;
