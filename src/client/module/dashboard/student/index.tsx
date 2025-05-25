'use client';

import React from 'react';
import { Column, DataTable } from '@/client/components/DataTable';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

type Student = {
  id: number;
  name: string;
  email: string;
  major: string;
};

const students: Student[] = [
  { id: 1, name: "Ahmad Yusuf", email: "ahmad@example.com", major: "Computer Science" },
  { id: 2, name: "Budi Santoso", email: "budi@example.com", major: "Information Systems" },
  { id: 3, name: "Citra Dewi", email: "citra@example.com", major: "Electrical Engineering" },
  { id: 4, name: "Dina Ayu", email: "dina@example.com", major: "Mathematics" },
  { id: 5, name: "Eka Putra", email: "eka@example.com", major: "Physics" },
  { id: 6, name: "Fajar Pratama", email: "fajar@example.com", major: "Computer Science" },
];

export default function StudentPage() {
  const handleEdit = (student: Student) => {
    console.log('Edit student:', student);
    // Tambahkan logika edit di sini
  };

  const handleDelete = (student: Student) => {
    console.log('Delete student:', student);
    // Tambahkan logika delete di sini
  };

  const columns: Column<Student>[] = [
    { key: "id", header: "ID", accessor: "id", sortable: true },
    { key: "name", header: "Name", accessor: "name", sortable: true },
    { key: "email", header: "Email", accessor: "email" },
    { key: "major", header: "Major", accessor: "major", sortable: true },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex  space-x-10">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Student List</h1>
      <DataTable data={students} columns={columns} pageSize={5} />
    </div>
  );
}
