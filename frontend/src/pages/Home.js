import React, { useEffect, useState } from "react";

function Home() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/auctions/")
      .then((res) => res.json())
      .then((data) => {
        setAuctions(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCreateAuction = () => {
    const token = localStorage.getItem("access");

    if (!token) {
      window.location.href = "/login";
    } else {
      window.location.href = "/create-auction";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Active Auctions</h1>

      <button
        className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleCreateAuction}
      >
        Create Auction
      </button>

      {auctions.length === 0 ? (
        <p>No auctions found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">{auction.title}</h2>

              <p className="text-gray-400 mb-3">{auction.description}</p>

              <p className="text-green-400 font-semibold">
                Start price: ${auction.starting_price}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Category: {auction.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;