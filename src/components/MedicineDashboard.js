import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, removeItem } from "../store/medicineSlice";
import Navbar from "./Navbar";
import checkAuth from "../auth/checkAuth";

function MedicineDashboard() {
  const [medicine, setMedicine] = useState("");
  const [stocks, setStocks] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  //Editing state
  const [editId, setEditId] = useState(null);
  const [editMedicine, setEditMedicine] = useState("");
  const [editStocks, setEditStocks] = useState(null);
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicineInfo.medicine);

  const addProduct = () => {
    var x = medicines.length + 1;
    const newMedicine = {
      id: x,
      name: medicine,
      stocks: stocks,
      addedTime: new Date().toLocaleString(),
    };
    dispatch(addItem(newMedicine));
    setMedicine("");
    setStocks("");
  };

  //

  //Function for deleting the medicine
  const deleteMed = (id) => {
    alert("Are you sure?");
    dispatch(removeItem(id));
  };

  //Trigger edit option
  const editMed = (medicine) => {
    setEditId(medicine.id);
    setEditMedicine(medicine.medicine);
    setEditStocks(medicine.stocks);
  };

  const saveEdit = () => {
    if (editMedicine.trim() !== "" && editStocks !== null) {
      const updatedMed = {
        id: editId,
        name: editMedicine,
        stocks: editStocks,
        addedTime: new Date().toLocaleString(),
      };
      dispatch(editItem(updatedMed));
      setEditId(null);
      setEditMedicine("");
      setEditStocks(null);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setMedicine("");
    setStocks("");
  };

  const storedMedicines = JSON.parse(localStorage.getItem("medicine")) || [];

  const filteredMedicines = storedMedicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //pagination codes
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Navbar />

      {/* Search Section */}
      <div className="container mb-5 mt-4 text-center">
        <h3>Search Medicines</h3>
        <input
          className="form-control w-50 mx-auto"
          type="text"
          placeholder="Search by Medicine Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add Product & Table */}
      <div className="container">
        <div className="row justify-content-center">
          {/* Add Product Section */}
          <div className="col-12 col-lg-4 text-center">
            <div className="form-group w-75 mx-auto">
              <h2>Add Product</h2>
              <input
                className="form-control my-2"
                type="text"
                name="medicine"
                placeholder="Medicine Name..."
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
              />
              <input
                className="form-control my-2"
                type="number"
                name="stocks"
                placeholder="Number of Stocks"
                value={stocks}
                onChange={(e) => setStocks(e.target.value)}
              />
              <button className="btn btn-success w-100" onClick={addProduct}>
                {editId ? "Edit Medicine" : "Add Medicine"}
              </button>
            </div>
          </div>

          {/* Medicine Table */}
          <div className="col-12 col-lg-8 my-2">
            <div className="d-flex justify-content-center">
              <table className="table table-striped w-100 text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Medicine</th>
                    <th>Available Stock</th>
                    <th>Added Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMedicines.map((medicine) => (
                    <tr key={medicine.id}>
                      <td>{medicine.id}</td>
                      <td>
                        {editId === medicine.id ? (
                          <input
                            type="text"
                            value={editMedicine}
                            onChange={(e) => setEditMedicine(e.target.value)}
                          />
                        ) : (
                          medicine.name
                        )}
                      </td>
                      <td>
                        {editId === medicine.id ? (
                          <input
                            type="number"
                            value={editStocks}
                            onChange={(e) =>
                              setEditStocks(Number(e.target.value))
                            }
                          />
                        ) : (
                          medicine.stocks
                        )}
                      </td>
                      <td>{medicine.addedTime}</td>
                      <td>
                        {editId === medicine.id ? (
                          <>
                            <button
                              className="btn btn-success me-2"
                              onClick={saveEdit}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-primary me-2"
                              onClick={() => editMed(medicine)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteMed(medicine.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="fw-bold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(MedicineDashboard);
