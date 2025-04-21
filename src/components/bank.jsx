import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Bank() {
  const [propertyPrice, setPropertyPrice] = useState(3000);
  const [initialDeposit, setInitialDeposit] = useState(600);
  const [borrowedAmount, setBorrowedAmount] = useState(2400);
  const [rateOfInterest, setRateOfInterest] = useState(5);
  const [loanDuration, setLoanDuration] = useState(5);

  const monthsCount = loanDuration * 12;
  const monthlyRate = rateOfInterest / 100 / 12;

  const emi = (
    (borrowedAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, monthsCount)) /
    (Math.pow(1 + monthlyRate, monthsCount) - 1)
  ).toFixed(2);

  const totalInterestPayable = (emi * monthsCount - borrowedAmount).toFixed(2);

  const pieChartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [borrowedAmount, totalInterestPayable],
        backgroundColor: ["#facc15", "#4ade80"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-2xl font-bold text-white bg-indigo-700 py-4 px-6 rounded-lg shadow-md mb-8">
        🏦 Dream Loan Calculator
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Inputs */}
        <div className="flex-1 space-y-6 bg-white p-6 rounded-lg shadow-md">
          {/* Property Price */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Home Value
            </label>
            <p className="text-xl font-bold text-indigo-600">
              ${propertyPrice}
            </p>
            <input
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={propertyPrice}
              onChange={(e) => {
                const newPrice = Number(e.target.value);
                const newDeposit = newPrice * 0.2;
                setPropertyPrice(newPrice);
                setInitialDeposit(newDeposit);
                setBorrowedAmount(newPrice - newDeposit);
              }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$1000</span>
              <span>$10000</span>
            </div>
          </div>

          {/* Initial Deposit */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Down Payment
            </label>
            <p className="text-xl font-bold text-indigo-600">
              ${initialDeposit}
            </p>
            <input
              type="range"
              min="0"
              max={propertyPrice}
              step="50"
              value={initialDeposit}
              onChange={(e) => {
                const deposit = Number(e.target.value);
                setInitialDeposit(deposit);
                setBorrowedAmount(propertyPrice - deposit);
              }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$0</span>
              <span>${propertyPrice}</span>
            </div>
          </div>

          {/* Borrowed Amount */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Loan Amount
            </label>
            <p className="text-xl font-bold text-indigo-600">
              ${borrowedAmount}
            </p>
            <input
              type="range"
              min="0"
              max={propertyPrice}
              step="50"
              value={borrowedAmount}
              onChange={(e) => {
                const loan = Number(e.target.value);
                setBorrowedAmount(loan);
                setInitialDeposit(propertyPrice - loan);
              }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$0</span>
              <span>${propertyPrice}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Interest Rate (%)
            </label>
            <p className="text-xl font-bold text-indigo-600">
              %{rateOfInterest}
            </p>
            <input
              type="range"
              min="2"
              max="18"
              step="0.1"
              value={rateOfInterest}
              onChange={(e) => setRateOfInterest(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>%2</span>
              <span>%18</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
               Tenure
            </label>
            <select
              value={loanDuration}
              onChange={(e) => setLoanDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {[5, 10, 15, 20, 25, 30].map((year) => (
                <option key={year} value={year}>
                  {year} Years
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart and Result */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">
            💰 Monthly EMI: <span className="text-black">${emi}</span>
          </h2>
          <div className="w-[280px]">
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bank;
