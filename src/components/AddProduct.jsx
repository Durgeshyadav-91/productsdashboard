import React, { useState } from "react";
import { addProduct } from "../services/api";

export default function AddProduct({ data, setData, close }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addProduct({
            title,
            price,
            description,
            category,
            image: "",
        });
        setData([res.data, ...data]);
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0f172a] text-white rounded-xl w-full max-w-xl p-6 shadow-2xl">

                <h2 className="text-xl font-semibold mb-6">
                    Add New Product
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        placeholder="Title"
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        rows="3"
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Category"
                        className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 border border-gray-600 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-green-600 rounded-md hover:bg-green-700"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
