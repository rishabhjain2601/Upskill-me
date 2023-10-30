import React from "react";
import DownArrow from "../assets/down-arrow-home.png";
import QuickLink from "../assets/quick-link.png";
import HomeStar from "../assets/home-star.png";
import HomeLights from "../assets/home-lights.png";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-center text-gray-50 overflow-hidden">
        <div className="w-11/12 max-w-screen-xl relative">
          <div className="multi-layered-glow"></div>
          <div className="mt-14 text-center">
            <h1 className="select-none text-5xl sm:text-6xl font-extrabold home-font1 lg:tracking-wide">
              One Stop Solution
              <br />
              for Your Career
            </h1>
            <h4 className="mt-6 text-lg sm:text-xl font-semibold home-font2">
              Unlock Your Potential, Shape Your Future.
            </h4>
          </div>
          <div className="m-6 flex flex-col items-center">
            <button onClick={()=>{navigate('/form')}}
              className="rounded-md bg-yellow-500 px-10 py-2 sm:px-12 sm:py-3 text-lg font-extrabold home-font2 text-gray-900 hover:bg-yellow-400 active:scale-95 shadow-md shadow-yellow-300/50"
            >
              GET STARTED
            </button>
            <img src={DownArrow} alt="down-arrow-home icon" className="mt-4" />
            <img src={DownArrow} alt="down-arrow-home icon" />
          </div>
          <div className="flex flex-col items-center mt-16">
            <div className="flex gap-2 items-start relative">
              <h2 className="text-3xl sm:text-4xl font-bold home-font1">Quick Links !</h2>
              <img
                src={HomeStar}
                alt="star icon image"
                className="absolute -right-10"
              />
            </div>
            <div className="flex mt-8 gap-2 justify-center sm:gap-4 lg:gap-8">
              <div className="w-[300px]">
                <a href="#"
                ><img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7P2JXV1XLZwMxe7IxCbJB_-NkBp5ZgG7jug&usqp=CAU'
                    alt="link image"
                    className="hover:opacity-80 rounded-2xl"
                  /></a>
                <h4 className="text-lg sm:text-xl text-center font-semibold home-font2">Career Quiz</h4>
              </div>
              <div className="w-[300px]">
                <a href="#"
                ><img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDqYoGHl4oWNA8oYPKAv6cL8i9aVbxtsrNg&usqp=CAU'
                    alt="link image"
                    className="hover:opacity-80 rounded-2xl"
                  /></a>
                <h4 className="text-lg sm:text-xl text-center font-semibold home-font2">Roadmap</h4>
              </div>
              <div className="w-[300px]">
                <a href="#"
                ><img
                    src='https://www.appsmith.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Flpvian6u6i39%2F7ASJaqoLu8ftXgHQ0Qjxt8%2Fea1d5e64708539fff075ca9981a11cc2%2FKPI_dashboard_____Appsmith.png&w=3840&q=75'
                    alt="link image"
                    className="hover:opacity-80 rounded-2xl"
                  /></a>
                <h4 className="text-lg sm:text-xl text-center font-semibold home-font2">DashBoard</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-20 gap-8">
            <h3 className="text-2xl sm:text-3xl font-bold home-font1">
              Help at every step to make you -
            </h3>
            <div className="flex w-4/5 sm:w-3/4 xl:w-1/2 flex-wrap justify-center gap-4">
              <img
                src="https://placehold.co/100x100"
                alt="success image"
                className="rounded-xl"
              />
              <img
                src="https://placehold.co/100x100"
                alt="success image"
                className="rounded-xl"
              />
              <img
                src="https://placehold.co/100x100"
                alt="success image"
                className="rounded-xl"
              />
              <img
                src="https://placehold.co/100x100"
                alt="success image"
                className="rounded-xl"
              />
              <img
                src="https://placehold.co/100x100"
                alt="success image"
                className="rounded-xl"
              />
            </div>
            <div className="flex w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 flex-wrap justify-center">
              <p className="text-lg font-semibold home-font1">
                Software Devoloper <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                Cricketer <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                Business Analyst <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                HR <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                Manager <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                Smart Contract Development <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                Data Analyst <span className="text-sm">✨</span>
              </p>
              <p className="text-lg font-semibold home-font1">
                Doctor <span className="text-sm">✨</span>
              </p>
            </div>
          </div>
          <div
            className="w-11/12 sm:w-9/12 bg-[#111C25] mt-16 mx-auto rounded-3xl bg-cover p-6 sm:p-8 border border-gray-700"
            style={{ backgroundImage: `url(${HomeLights})` }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center home-font1">Weekly Digest</h2>
            <h3
              className="text-xl sm:text-2xl text-center font-semibold text-[#9AAFC3] mt-2 sm:mt-4 sm:tracking-wider home-font2"
            >
              Latest news related to your skill
            </h3>
            <div className="text-center mt-4 sm:mt-8">
              <input
                type="email"
                name="user-email"
                id="user-email"
                className="w-full lg:w-80 py-2 px-3 text-lg bg-[#0a1117] border border-gray-700 rounded-lg outline-none placeholder:font-semibold placeholder:text-gray-600 home-font2"
                placeholder="Your Email"
              />
              <button
                className="w-full lg:w-fit mt-3 lg:mt-0 rounded-md bg-purple-400 px-12 py-2 sm:py3 text-lg font-bold text-gray-900 hover:bg-purple-300 active:scale-95 shadow-sm shadow-purple-300/50 lg:ml-4 home-font2"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
          <div className="my-16 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-semibold home-font1">What's your Idea?</h2>
            <h3
              className="text-xl sm:text-2xl font-semibold text-[#9AAFC3] mt-4 md:tracking-wide home-font1"
            >
              Let’s chat and see how we can help
            </h3>
            <div className="mt-8 lg:flex lg:w-1/2">
              <button
                className="w-full lg:w-1/2 rounded-md bg-yellow-400 py-2 px-6 text-lg font-bold text-gray-900 hover:bg-yellow-300 active:scale-95 shadow-sm shadow-yellow-300/50 home-font2"
              >
                DISCORD
              </button>
              <button
                className="mt-2 lg:mt-0 w-full lg:w-1/2 rounded-md bg-purple-400 py-2 px-6 text-lg font-bold text-gray-900 hover:bg-purple-300 active:scale-95 shadow-sm shadow-purple-300/50 lg:ml-4 home-font2"
              >
                EMAIL
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
