// import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto " />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023_
            <a href="https://github.com/ASAC-06-A" className="hover:underline">
              ASAC_06
            </a>
            . All Rights Reserved.
            {/* <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaGithub />
              <span className="sr-only">GitHub account</span>
            </a> */}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
