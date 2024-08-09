import React, { useState, useEffect,useRef } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs, { send } from '@emailjs/browser';

function Contact() {
  const [SentnSuccess, setSentSuccess] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_rw7otxl', 'template_zu7qpnl', form.current, {
        publicKey: 'Q9d8LlDlTw1hgni6I',
      })
      .then(
        () => {
          toast.success('Email sent successfully');
          setSentSuccess(true);
          console.log('SUCCESS!');
        },
        (error) => {
          toast.error('Email Failed to sent');
          console.log('FAILED...', error.text);
        },
      );
  };

  
  useEffect(() => {
    if (SentnSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [SentnSuccess]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col items-center mt-16">
        <div className="flex w-full">
          <div className="w-1/2 pt-5 mb-5 flex flex-col items-center justify-center">
            <h2 className="font-myanmar text-5xl font-bold mb-4">Contact Us</h2>
            <p className="font-myanmar text-center mb-8 w-3/4 text-justify">
              If you have any <b className="text-hoverPurple"> issues</b> or are looking for <b className="text-hoverPurple">courses</b>{" "}
              that are not on our website, please contact us. Our team will
              respond to you as soon as possible.
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div className="bg-white shadow-xl rounded p-8 mb-5 w-2/3">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col space-y-4 w-full items-center"
              >
                <div className="flex space-x-4 w-full justify-center">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="email" className="font-myanmar mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="name" className="font-myanmar mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="message" className="font-myanmar mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Message"
                    name="message"
                    className="border border-gray-300 rounded px-2 py-1 h-60"
                  ></textarea>
                  <div className="flex justify-start mt-2">
                    <button
                      type="submit"
                      className="font-myanmar bg-customPurple text-white rounded px-4 py-2 hover:bg-hoverPurple w-40"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;