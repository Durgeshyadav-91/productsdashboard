import React from "react";
import { deleteProduct } from "../services/api";

export default function ProductList({ data, setData, loading, onEdit, onAdd, search, setSearch, category, setCategory, categories }) {
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setData(data.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-blue-600">
                Loading products...
            </div>
        );
    }

    return (
        <div className="w-full px-12 pb-12 bg-black min-h-screen flex flex-col">
            <div className="sticky top-0 left-0 right-0 z-50 bg-black px-12 py-4 mb-4 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white text-center">
                    Product Dashboard
                </h1>
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded bg-black text-white"
                    >
                        <option value="all">All</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                    <button onClick={onAdd} className="text-nowrap px-4 py-2 rounded-md bg-blue-600">
                        Add New Product
                    </button>
                </div>
            </div>

            {data.length > 0 ? (
                <div className="w-full overflow-x-auto shadow-xl rounded-xl border bg-black">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Description</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b transition w-full"
                                >
                                    <td className="w-full p-4 font-medium text-start text-white">
                                        {product.title}
                                    </td>

                                    <td className="p-4 font-semibold text-emerald-600">
                                        ₹ {product.price}
                                    </td>

                                    <td className="p-4 text-white max-w-xl truncate">
                                        {product.description}
                                    </td>

                                    <td className="p-4">
                                        <span className="px-3 py-1 text-xs font-semibold text-nowrap rounded-full bg-purple-100 text-purple-700">
                                            {product.category}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="flex items-center gap-1 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition shadow"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className="flex items-center gap-1 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition shadow"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-12 text-lg">
                    No products found
                </p>
            )}
        </div>
    );
}
