import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../../../utils";
import { getAllBooks } from "../../../redux/actions";


const NewProducts = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const [sortedInfo, setSortedInfo] = useState({ columnKey: null, order: null });

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const data = allBooks.map((book, index) => ({
    key: index,
    id: book.id,
    image: book.image,
    genre: book.genre,
    title: book.title,
    price: book.price,
    stock: book.stock,
    active: book.active,
  }));

  const uniqueGenres = [...new Set(allBooks.map((book) => book.genre))];
  const genres = uniqueGenres.map((genre) => ({
    text: genre,
    value: genre,
  }));

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const changeBookStatus = (id, active) => {
    axios
      .put(`${BACKEND_URL}/books/activation`, { id, active: !active })
      .then((res) => {
        // Lógica de manejo de respuesta si es necesario
        dispatch(getAllBooks());
      })
      .catch((err) => {
        // Lógica de manejo de errores si es necesario
      });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
      render: (image) => (
        <img src={image} alt="book cover" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
      className: "bg-[#ccc1b3] dark:bg-[#2D364B] dark:text-white",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      className: "bg-[#ccc1b3] dark:bg-[#2D364B] dark:text-white",
      filters: genres,
      onFilter: (value, record) => record.genre.indexOf(value) === 0,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: 'Action',
      key: 'operation',
      className: "bg-[#dbd1c3] dark:bg-[#40495C] dark:text-white",
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button
          style={{ backgroundColor: record.active ? 'green' : 'red', color: 'white' }}
          onClick={() => changeBookStatus(record.id, record.active)}
        >
          {record.active ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
  ];

  return (
    <div className='h-screen pt-2 bg-[#B2D1C5] dark:bg-[#101726]'>
      <h1 className="text-center text-3xl mt-2 text-[#816d64] dark:text-white">Books Admin-Dashboard</h1>
    <Table
      className="bg-white"
      columns={columns}
      dataSource={data}
      onChange={handleChange}
      scroll={{
        x: 1500,
        y: 700,
      }}
    />
    </div>
  );
};

export default NewProducts;

