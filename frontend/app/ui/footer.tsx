import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white xs:hidden md:block shadow-sm py-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <h2>&copy;AirBnb, Inc</h2>
          </Link>
          <nav className="flex items-center">
            <a href="/terms" className="text-gray-600 hover:text-gray-800 mr-4">
              Terms
            </a>
            <a
              href="/sitemap"
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              Sitemap
            </a>
            <a
              href="/privacy"
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              Privacy
            </a>
            <a
              href="/privacy-choices"
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Your Privacy Choices
              <svg
                className="ml-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11 9H5V7H11V9Z"
                  fill="#006BE6"
                />
              </svg>
            </a>
          </nav>
        </div>
        <div className="flex items-center">
          <button className="text-gray-600 hover:text-gray-800 mr-4">
            English (US)
          </button>
          <button className="text-gray-600 hover:text-gray-800 mr-4">
            USD
          </button>
          <button className="text-gray-600 hover:text-gray-800 flex items-center">
            Support & resources
            <svg
              className="ml-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11 9H5V7H11V9Z"
                fill="#006BE6"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
