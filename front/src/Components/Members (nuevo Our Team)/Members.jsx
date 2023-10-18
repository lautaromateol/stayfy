import React, { useEffect } from "react";
import Aos from 'aos'
import 'aos/dist/aos.css'

const Members = () => {

  useEffect(() => {
    Aos.init({duration:1500})
  }, [])

  return (
    <div className="mt-16 pb-16" data-aos = 'fade-up'>
      <div className="flex items-center justify-center text-center ">
        <div className="flex flex-col p-10 m-2 ">
          <div className="text-3xl font-medium dark:text-gray-100">Meet Our Team</div>
          <div className="text-sm mx-2 md:text-xl  dark:text-gray-100">
            Meet the team member who have worked in this project
          </div>

          <div className="md:grid flex">
            <div className="flex items-center justify-center md:flex-row flex-col space-x-4  p-2 ">
              <div className="flex-col px-6 py-2  max-w-7xl" >
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066818/juane_w65i3b.jpg'
                    alt="Imagen de Juan Emilio Elizondo"
                    className=""
                  />
                </div>
                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/juan-emilio-elizondo/">
                    Juan Emilio Elizondo
                </a>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066819/lara_fd5dtn.png'
                    alt="Imagen de Lara María De Cillis"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/laradecillis/">
                    Lara María De Cillis
                </a>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066818/mati_ztu9in.jpg'
                    alt="Imagen de Matias Helueni"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/matias-helueni-255023197/">
                    Matias Helueni
                </a>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066818/L_vghyg7.svg'
                    alt="Imagen de Lautaro Leguizamon"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/lautaro-mateo-leguizamon-35b902279/">
                    Lautaro Leguizamon
                </a>
                <div className=" italic text-gray-500">FrontEnd</div>
              </div>
            </div>
            <div className="flex space-x-4  p-2 items-center justify-center md:flex-row flex-col ">
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066819/agustin_ynxqtl.png'
                    alt="Imagen de Agustin Radocaj"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/agustin-radocaj/">
                    Agustín Radocaj
                </a>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066818/daniel_xm7ywx.jpg'
                    alt="Imagen de Daniel Chávez"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/daniel-ch%C3%A1vez-93065b181/">
                    Daniel Chávez
                </a>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066818/joseLuis_rhicxl.jpg'
                    alt="Imagen de José Luis Farias"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900  dark:text-gray-100" href="https://www.linkedin.com/in/jos%C3%A9-luis-far%C3%ADas-4a5816157/">
                    José Luis Farias
                </a>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
              <div className="flex-col px-6 py-2 ">
                <div className="md:h-40 h-28 w-28 md:w-40 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src='https://res.cloudinary.com/dhqudb28a/image/upload/v1697066817/D_ukboni.png'
                    alt="Imagen de Duglas Antonio Paez"
                    className=""
                  />
                </div>

                <a className="text-lg font-medium text-stone-700 cursor-pointer hover:text-stone-900 dark:text-gray-100" href="https://www.linkedin.com/in/duglas-paez-089065107/">
                    Duglas Antonio Paez
                </a>
                <div className=" italic text-gray-500">BackEnd</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
};

export default Members;
