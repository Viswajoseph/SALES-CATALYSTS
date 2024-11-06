import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import '../style/ASMPage.css';

Chart.register(...registerables);

function ASMPage() {
 const [salesOfficers, setSalesOfficers] = useState([]);
 const [reports, setReports] = useState([]);
 const [newOfficer, setNewOfficer] = useState({ name: '', email: '' });
 const [monthlyData, setMonthlyData] = useState([11000, 15000, 17000, 13000, 16000, 18000, 20000]);
 const [quarterlyData, setQuarterlyData] = useState([45000, 48000, 50000, 52000]);
 const [confirmedBills, setConfirmedBills] = useState([]);
 const [selectedBill, setSelectedBill] = useState(null);

 const handleAddSalesOfficer = () => {
  setSalesOfficers([...salesOfficers, newOfficer]);
  setNewOfficer({ name: '', email: '' });
 };

 const handleViewReports = () => {
  setReports([
   { id: 1, title: 'Monthly Sales Report', date: 'October 2024' },
   { id: 2, title: 'Quarterly Performance', date: 'Q3 2024' },
  ]);
 };

 useEffect(() => {
  // Fetch confirmed bills from MongoDB
  const fetchConfirmedBills = async () => {
   try {
    const response = await axios.get('http://localhost:5000/orders');
    setConfirmedBills(response.data);
   } catch (error) {
    console.error('Error fetching orders:', error);
   }
  };

  fetchConfirmedBills();
 }, []);

 const handleBillClick = (bill) => {
  setSelectedBill(bill);
 };

 const closeModal = () => {
  setSelectedBill(null);
 };

 const monthlyChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
   {
    label: 'Monthly Sales (Rs.)',
    data: monthlyData,
    backgroundColor: '#007bff',
   },
  ],
 };

 const quarterlyChart = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
   {
    label: 'Quarterly Sales (Rs.)',
    data: quarterlyData,
    backgroundColor: '#28a745',
   },
  ],
 };

 return (
  <div className="asm-container">
   <h2 className="asm-title">Area Sales Manager Dashboard</h2>

   {/* Create Sales Officer Section */}
   <div className="asm-section">
    <h3>Create New Sales Officer</h3>
    <input
     type="text"
     placeholder="Name"
     value={newOfficer.name}
     onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
     className="asm-input"
    />
    <input
     type="email"
     placeholder="Email"
     value={newOfficer.email}
     onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
     className="asm-input"
    />
    <button onClick={handleAddSalesOfficer} className="asm-button">
     Add Sales Officer
    </button>
   </div>

   {/* Monthly Sales Report */}
   <div className="asm-section">
    <h3>Monthly Sales Report</h3>
    <Bar data={monthlyChart} />
   </div>

   {/* Quarterly Sales Report */}
   <div className="asm-section">
    <h3>Quarterly Sales Report</h3>
    <Bar data={quarterlyChart} />
   </div>

   {/* View Reports Section */}
   <div className="asm-section">
    <h3>Sales Reports</h3>
    <button onClick={handleViewReports} className="asm-button">View Reports</button>
    <ul className="asm-report-list">
     {reports.map((report) => (
      <li key={report.id} className="asm-report-item">
       {report.title} - {report.date}
      </li>
     ))}
    </ul>
   </div>

   {/* Sales Officers List */}
   <div className="asm-section">
    <h3>Sales Officers</h3>
    <ul className="asm-sales-officer-list">
     {salesOfficers.map((officer, index) => (
      <li key={index} className="asm-sales-officer-item">
       {officer.name} ({officer.email})
      </li>
     ))}
    </ul>
   </div>

   {/* Confirmed Bills Section */}
   <div className="asm-section">
    <h3>Confirmed Bills</h3>
    <ul className="asm-bills-list">
     {confirmedBills.map((bill) => (
      <li key={bill._id} className="asm-bill-item" onClick={() => handleBillClick(bill)}>
       Date: {new Date(bill.date).toLocaleDateString()} | Amount: Rs.{bill.price}
      </li>
     ))}
    </ul>
   </div>

   {/* Modal for Bill Details */}
   {selectedBill && (
    <div className="modal-overlay" onClick={closeModal}>
     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>Bill Details</h3>
      <p><strong>Shop Name:</strong> {selectedBill.shopName}</p>
      <p><strong>Product:</strong> {selectedBill.product}</p>
      <p><strong>Quantity:</strong> {selectedBill.quantity}</p>
      <p><strong>Price:</strong> Rs.{selectedBill.price}</p>
      <p><strong>Date:</strong> {new Date(selectedBill.date).toLocaleDateString()}</p>
      <button onClick={closeModal} className="asm-button">Close</button>
     </div>
    </div>
   )}
  </div>
 );
}

export default ASMPage;
