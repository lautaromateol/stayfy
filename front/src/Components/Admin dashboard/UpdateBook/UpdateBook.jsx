import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenres, getTitles } from "../../../redux/actions";
import { BACKEND_URL, DEFAULT_IMAGE } from "../../../../utils";
import { Link } from "react-router-dom";

export default function UpdateBook() {
  const dispatch = useDispatch();
  const { genres, allBooks } =  useSelector((state) => state);
  const ratingArray = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [form, setForm] = useState({
    id: "",
    title: "",
    authors: [],
    publisher: "",
    image: "",
    publishedDate: "",
    pageCount: "",
    genre: "",
    price: "",
    description: "",
    rating: "",
    stock: "",
  });

  const [error, setError] = useState({
    id: "",
    title: "",
    authors: [],
    publisher: "",
    image: "",
    publishedDate: "",
    pageCount: "",
    genre: "",
    price: "",
    description: "",
    rating: "",
    stock: "",
  });

  const [success, setSuccess] = useState(""); 
 
  const updateAuthor = (index, value) => {
    const updatedAuthors = [...form.authors];
    updatedAuthors[index] = value;
    setForm({
      ...form,
      authors: updatedAuthors,
    });
  };

  const removeAuthor = (index) => {
    const updatedAuthors = form.authors.filter((_, i) => i !== index);
    setForm({
      ...form,
      authors: updatedAuthors,
    });
  };

  const changeHandlder = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  const validateID = (id) => {
    if (!id || id === "") {
      setError({ ...error, id: "You must select a book in order to update it." })
      return false;
    } else {
      setError({ ...error, id: "" })
      return true;
    }
  };

  const validateImage = (image) => {
    const regex = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|gif|png)$/;
    if (image && !regex.test(image)) {
      setError({ ...error, image: "Invalid image URL." });
      return false;
    } else {
      setError({ ...error, image: "" });
      return true;
    }
  };  
  
  // const validatePublishedDate = (publishedDate) => {
  //   const regex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para el formato de fecha (yyyy-mm-dd)
  
  //   if (publishedDate && !regex.test(publishedDate)) {
  //     setError({ ...error, publishedDate: "Invalid publucation date. Please use yyyy-mm-dd format." });
  //     return false;
  //   } else {
  //     setError({ ...error, publishedDate: "" });
  //     return true;
  //   }
  // };

  const validatePublishedDate = (publishedDate) => {
  
      if (publishedDate && !Number.isInteger(publishedDate)) {
        setError({ ...error, publishedDate: "Year of publication must be an integer." });
        return false;
      } else if (publishedDate && publishedDate < 1) {
        setError({ ...error, publishedDate: "Year of publication must be above 0." });
        return false;
      } else if (publishedDate && publishedDate > 2023) {
        setError({ ...error, publishedDate: "The input year has not come yet." });
        return false;
      } else {
        setError({ ...error, publishedDate: "" });
        return true;
      }
    };

    const validatePageCount = (pageCount) => {
      if (pageCount && !Number.isInteger(pageCount)) {
        setError({ ...error, pageCount: "Page count must be an integer." });
        return false;
      } else if (pageCount && pageCount < 1) {
        setError({ ...error, pageCount: "Page count must be above 0." });
        return false;
      } else {
        setError({ ...error, pageCount: "" });
        return true;
      }
    };
  

  const validatePrice = (price) => {
    if (price && !Number.isInteger(price)){
      setError({ ...error, price: "Price must be an integer." })
      return false;
    }
    else if (price && price < 1) {
      setError({ ...error, price: "Price must be above 0." })
      return false;
    } else {
      setError({ ...error, price: "" })
      return true;
    }
  };

  const validateStock = (stock) => {
    if (stock && !Number.isInteger(stock)){
      setError({ ...error, stock: "Stock must be an integer." })
      return false;
    }
    else if (stock && stock < 0) {
      setError({ ...error, stock: "Stock must be 0 or above." })
      return false;
    } else {
      setError({ ...error, stock: "" })
      return true;
    }
  };

  const validateForm = ( title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, stock ) => {
    if (
      (!title || title === "") &&
      (!authors || authors.length === 0 || authors == [] || authors == [""]) &&
      (!publisher || publisher === "") &&
      (!image || image === "") &&
      (!publishedDate || publishedDate === "") &&
      (!pageCount || pageCount === "") &&
      (!genre || genre === "") &&
      (!price || price === "") &&
      (!description || description === "") &&
      (!rating || rating === "" ) &&
      (!stock || stock === ""))
    {
      return false;
    } else {
      return true;
    }
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateID(form.id)) {
      alert("You must select a book in order to update it.");
      return;
    };
    const { title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, stock } = form 
    if (!validateForm( title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating, stock )){
      alert("You must select at least one parameter to update the book.");
      return;
    };
    console.log("Form Data:", form); // VALIDACIÓN EN PROCESO
    axios
    .put(`${BACKEND_URL}/books/update`, {
      ...form,
      genre: form.genre.toString(),
      rating: parseInt(form.rating),
      stock: parseInt(form.stock),
    })
    .then((res) => {
      setSuccess("Book updated successfully!");
      setError({});
      alert("Book updated successfully!");
    })
    .catch((err) => {
      setError({ ...error, error: "There was an error." });
      setSuccess("");
      alert("There was an error.");
    });
  };


  return (
    <div className="m-auto px-60 pt-6 pb-6 bg-[#b2d1c5] dark:bg-[#111827]">
      <div className="text-2xl font-semibold mt-4 mb-4 text-[#816d64] dark:text-white">
        <h2>UPDATE EXISTING BOOK</h2>
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}{" "}
      {/* Mostrar el mensaje de éxito */}
      {error.error && (
        <div className="text-red-600 mb-2">{error.error}</div>
      )}{" "}
      {/* Mostrar el mensaje de error */}


      {/* ARRANCA FORM */}
      <form
        onSubmit={submitHandler}
        className="bg-white dark:bg-[#40495C] shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
      >

        {/* SELECT BOOK */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="id"
          >
            Select book (ID - Title):
          </label>
          <select
            required
            value={form.id}
            name="id"
            onChange={(event) => {
              const selectedBook = Array.from(
                event.target.selectedOptions,
                (option) => option.value
              );
              setForm({ ...form, id: selectedBook });
            }}
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          >
            <option value={""}> Select book </option>
            {allBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.id}
                {" - "}
                {book.title}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(event) => {
              changeHandlder(event);
            }}
            name="title"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>

            {/* GENRE */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="genre"
          >
            Genre:
          </label>
          <select
            value={form.genre}
            name="genre"
            className="rounded dark:bg-[#2d364b] dark:text-[#F2F3F5]"
            onChange={(event) => {
              const selectedGenre = Array.from(
                event.target.selectedOptions,
                (option) => option.value
              );
              setForm({ ...form, genre: selectedGenre });
              console.log(form.id);
            }}
          >
            <option value={""}> Select genre </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

              {/* AUTHOR */}
        <div>
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="authors"
          >
            Authors:
          </label>
          {form.authors.map((author, index) => (
            <div key={index}>
              <input
                type="text"
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
                className="dark:bg-[#2d364b] dark:text-[#F2F3F5]"
              />
              <button onClick={() => removeAuthor(index)} className="bg-transparent hover:bg-red-800 text-red-800 font-extrabold hover:text-white py-2 px-4 border border-red-800 dark:border-gray-400 dark:text-white dark:bg-red-800 dark:bg-opacity-50 hover:dark:bg-red-800 hover:border-transparent rounded">Remove</button>
            </div>
          ))}
        </div>

        {/* Input adicional para agregar automáticamente un nuevo autor */}
        <input
          type="text"
          value=""
          className="rounded mb-4 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          onChange={(e) => {
            const newAuthor = e.target.value;
            if (newAuthor) {
              setForm({
                ...form,
                authors: [...form.authors, newAuthor],
              });
            }
          }}
          placeholder="Add Author"
        />


          {/* PUBLISHER */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="publisher"
          >
            Publisher:
          </label>
          <input
            type="text"
            value={form.publisher}
            onChange={(event) => {
              changeHandlder(event);
            }}
            name="publisher"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>


            {/* IMAGE */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="image"
          >
            Image:
          </label>
          <input
            type="url"
            value={form.image}
            onChange={(event) => {
              validateImage(event.target.value);
              changeHandlder(event);
            }}
            name="image"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>


            {/* YEAR OF PUBLICATION */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="publishedDate"
          >
            Year of Publication:
          </label>
          <input
            type="number"
            value={form.publishedDate}
            onChange={(event) => {
              validatePublishedDate(event.target.value);
              changeHandlder(event);
            }}
            name="publishedDate"
            placeholder = "Indicate year of publication (integer, between 1 and 2023)"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>

            {/* PAGE COUNT */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="pageCount"
          >
            Page Count:
          </label>
          <input
            type="number"
            value={form.pageCount}
            onChange={(event) => {
              validatePageCount(event.target.value);
              changeHandlder(event);
            }}
            name="pageCount"
            placeholder = "Indicate amount of pages (integer and above 0)"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>

            {/* PRICE */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            type="number"
            value={form.price}
            onChange={(event) => {
              validatePrice(event.target.value);
              changeHandlder(event);
            }}
            name="price"
            placeholder = "Indicate price (integer and above 0)"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>

            {/* STOCK */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="stock"
          >
            Stock:
          </label>
          <input
            type="number"
            value={form.stock}
            onChange={(event) => {
              validateStock(event.target.value);
              changeHandlder(event);
            }}
            name="stock"
            placeholder = "Indicate amount of units left in stock (integer and above 0)"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>

            {/* RATING */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="rating"
          >
            Rating:
          </label>
          <select
            value={form.rating}
            className="dark:bg-[#2d364b] dark:text-[#F2F3F5]"
            name="rating"
            onChange={(event) => {
              const selectedRating = Array.from(
                event.target.selectedOptions,
                (option) => option.value
              );
              setForm({ ...form, rating: selectedRating });
              console.log(form.id);
            }}
          >
            <option value={""}> Select rating </option>
            {ratingArray.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

              {/* DESCRIPTION */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            value={form.description}
            onChange={(event) => {
              changeHandlder(event);
              validateDescription(event.target.value);
            }}
            name="description"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#2d364b] dark:text-[#F2F3F5]"
          />
        </div>


        <div className="mb-4">
          {!success && (
            <button
              type="submit"
              className="bg-[#477A7D] dark:bg-[#1E293B] dark:hover:bg-[#54617d] hover:bg-[#6cbfa0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update Book
            </button>
          )}
        </div>

        <div className="mb-4">
          {success && (
            <Link
              to={`/product-page/${form.id}`}
              className="bg-[#477A7D] dark:bg-[#1E293B] dark:hover:bg-[#54617d] hover:bg-[#6cbfa0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-300"
            >
              View Updated Book
            </Link>
          )}
        </div>

        <div className="mb-4">
          {success && (
            <a
              href="/admin/update-book"
              className="bg-[#477A7D] dark:bg-[#1E293B] dark:hover:bg-[#54617d] hover:bg-[#6cbfa0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update Another Book
            </a>
          )}
        </div>
        
        <div className="mb-4">
            <Link
              to={"/admin/activate-book"}
              className="bg-[#477A7D] dark:bg-[#1E293B] dark:hover:bg-[#54617d] hover:bg-[#6cbfa0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Activate or Deactivate Books
            </Link>
        </div>

        <div className="mb-4">
          {success && (
            <button
              type="submit"
              className="bg-[#477A7D] dark:bg-[#1E293B] dark:hover:bg-[#54617d] hover:bg-[#6cbfa0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update More Properties on Same Book
            </button>
          )}
        </div>

      </form>
    </div>
  );
};