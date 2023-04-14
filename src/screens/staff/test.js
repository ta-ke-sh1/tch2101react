import React from "react";
import { useState } from 'react';
import 'tailwindcss/dist/tailwind.min.css';

export  default function MyComponent() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
    { id: 3, name: 'Bob Smith', age: 40 },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({ id: '', name: '', age: '' });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewItem(item);
  };

  const handleSave = () => {
    if (!newItem.id || !newItem.name || !newItem.age) return;

    const index = data.findIndex(item => item.id === newItem.id);
    if (index === -1) {
      setData([...data, newItem]);
    } else {
      setData(data.map(item => item.id === newItem.id ? newItem : item));
    }

    setEditingId(null);
    setNewItem({ id: '', name: '', age: '' });
  };

  const handleDelete = (item) => {
    setData(data.filter(i => i.id !== item.id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                {editingId === item.id
                  ? <input type="text" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="w-full" />
                  : item.name
                }
              </td>
              <td className="border px-4 py-2">
                {editingId === item.id
                  ? <input type="number" value={newItem.age} onChange={e => setNewItem({ ...newItem, age: e.target.value })} className="w-full" />
                  : item.age
                }
              </td>
              <td className="border px-4 py-2">
                {editingId !== item.id &&
                  <>
                    <button onClick={() => handleEdit(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <button onClick={() => handleDelete(item)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                  </>
                }
                {editingId === item.id &&
                  <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                }
              </td>
            </tr>
          ))}
          <tr>
            <td className="border px-4 py-2">
              <input type="text" value={newItem.id} onChange={e => setNewItem({ ...newItem, id: e.target.value })} className="w-full" />
            </td>
            <td className="border px-4 py-2">
              <input type="text" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="w-full" />
            </td>
            <td className="border px-4 py-2">
              <input type="number" value={newItem.age} onChange={e => setNewItem({ ...newItem, age: e.target.value })} className="w-full" />
            </td>
            <td className="border px-4 py-2">
              <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}