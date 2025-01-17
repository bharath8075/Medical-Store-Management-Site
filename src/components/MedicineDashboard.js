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
      <div className="container mb-5">
        <h3>Search Medicines</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Search by Medicine Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row mt-4">
        <div className="col-5">
          <h2>Add Prodect</h2>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="medicine"
              placeholder="Medicine Name..."
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
            <input
              className="form-control "
              type="number"
              name="stocks"
              placeholder="Number of Stocks"
              value={stocks}
              onChange={(e) => setStocks(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-success" onClick={addProduct}>
              {editId ? "Edit Medicine" : "Add Medecine"}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <table className="table table-bordered table-stripped">
          <tr>
            <th>ID</th>
            <th>Medicine</th>
            <th>Available Stock</th>
            <th>Added time</th>
            <th>Actions</th>
          </tr>

          {displayedMedicines.map((medicine) => (
            <tr key={medicine.id}>
              <td> {medicine.id}</td>
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
                    onChange={(e) => setEditStocks(Number(e.target.value))}
                  />
                ) : (
                  medicine.stocks
                )}
              </td>

              {/* Display addedTime here */}
              <td>
                {editId === medicine.id ? (
                  <input
                    type="text"
                    value={medicine.addedTime} // Added time will be displayed here
                    readOnly
                  />
                ) : (
                  medicine.addedTime
                )}
              </td>

              <td>
                {editId === medicine.id ? (
                  <>
                    <button className="btn btn-primary" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="btn btn-danger" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
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
        </table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(MedicineDashboard);
