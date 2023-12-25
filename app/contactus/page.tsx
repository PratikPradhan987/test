"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Contact() {
  const URL = "http://localhost:3000/api/user";
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      result.json().then((json) => {
        setFeed(json);
        console.log(json);
      });
    };
    fetchData();
  }, []);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // console.log(name);
  const deletePost = async (postId: any) => {
    try {
      setLoading(true);
      // alert(postId);
      // console.log("asdasdasddd", postId);

      await fetch("/api/user?id=" + postId, {
        // await fetch("/api/user/" + postId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postId),
      });

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name && email && message) {
      // send a request to the server.
      try {
        const body = { name, email, message };
        await fetch(`/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        // await Router.push("/drafts");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We can help. Select a topic. Select the topic that best describes
              your issue
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <p className="leading-7 text-sm text-gray-600">Name</p>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <p className="leading-7 text-sm text-gray-600">Email</p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <p className="leading-7 text-sm text-gray-600">Message</p>
                  <textarea
                    id="message"
                    name="message"
                    onChange={(event) => setMessage(event.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handleSubmit}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Pathau Bhai
                </button>
              </div>
              <></>
            </div>
            <>
              {feed.length > 0 ? (
                feed.map((item: any, index) => (
                  <section key={index} className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap">
                      <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
                        {item.name}
                      </h2>
                      <div className="md:w-3/5 md:pl-6">
                        <p className="leading-relaxed text-base">
                          {item.message}
                        </p>
                        <div className="flex md:mt-4 mt-6">
                          <button
                            onClick={() => deletePost(item.id)}
                            className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded"
                          >
                            {loading ? "Loading" : "Delete"}
                          </button>
                          <a className="text-indigo-500 inline-flex items-center ml-4">
                            Update
                            <svg
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                ))
              ) : (
                <div>
                  <p>No draft posts found.</p>
                </div>
              )}
            </>
          </div>
        </div>
      </section>
    </>
  );
}
