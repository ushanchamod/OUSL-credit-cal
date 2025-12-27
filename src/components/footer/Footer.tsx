import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-8 mt-12 border-t border-gray-200 bg-white">
      <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{" "}
        <a
          href="https://ushan.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D06718] font-semibold hover:underline transition-colors"
        >
          Ushan
        </a>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Open University of Sri Lanka - Credit Calculator v1.0
      </p>
    </footer>
  );
};

export default Footer;
