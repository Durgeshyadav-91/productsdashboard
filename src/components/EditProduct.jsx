import React, { useState } from "react";
import { updateProduct } from "../services/api";

export default function EditProduct({ product, data, setData, close }) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);

    const handleUpdate = async () => {
        const res = await updateProduct(product.id, {
            ...product,
            title,
            price,
            description,
            category,
        });

        setData(
            data.map((p) => (p.id === product.id ? res.data : p))
        );
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0f172a] text-white rounded-xl w-full max-w-xl p-6 shadow-2xl border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold tracking-wide">
                        Edit Product
                    </h2>
                    <button
                        onClick={close}
                        className="text-gray-400 hover:text-white text-lg"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-start text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium text-gray-300 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-start text-sm font-medium text-gray-300 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={close}
                        className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}
