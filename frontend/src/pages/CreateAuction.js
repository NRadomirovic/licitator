import React, { useState } from "react";

function CreateAuction() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/api/auctions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        starting_price: price,
        duration_days: 7,
        category: "general",
      }),
    });

    if (res.ok) {
      alert("Auction created!");
      window.location.href = "/home";
    } else {
      alert("Error creating auction");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Create Auction</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 bg-gray-800 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 bg-gray-800 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Starting price"
          className="w-full p-2 bg-gray-800 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="bg-green-500 px-4 py-2 rounded">
          Create Auction
        </button>
      </form>
    </div>
  );
}

export default CreateAuction;