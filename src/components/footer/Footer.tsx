import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full text-center py-5text-gray-700 pb-3.5 mt-10">
      <p className="text-sm">
        Made with <FaHeart className="inline text-red-500 mx-1" /> by{" "}
        <a
          href="https://ushan.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D06718] font-signature text-base hover:underline"
        >
          Ushan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
