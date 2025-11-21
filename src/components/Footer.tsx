import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo/logo_icon.png";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="relative isolate bg-gray-900 pt-5 pb-5 md:pt-16 px-2 md:px-5">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-start justify-between border-b-2 border-gray-950 pb-10 w-full gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 justify-start">
                <img src={logo} alt="" className="h-10 md:h-14" />
                <p className="flex flex-col text-white text-xl md:text-4xl font-semibold">
                  StayScape
                  <span className="text-xs text-gray-400 font-light md:font-normal md:text-sm">
                    Discover. Relax. StayScape
                  </span>
                </p>
              </div>
              <p className="text-gray-200 text-base md:text-xl font-medium">
                Where your perefect stay begins..
              </p>
            </div>
            <div className="flex items-center jusitfy-start gap-5">
              <FaFacebook className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer h-6 w-6" />
              <FaInstagram className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer h-6 w-6" />
              <FaXTwitter className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer h-6 w-6" />
              <FaGithub className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer h-6 w-6" />
              <FaYoutube className="text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer h-6 w-6" />
            </div>
          </div>
          <div className="">
            <p className="text-sm md:text-lg text-gray-300 max-w-md">
              Subscribe to our newsletter for the latest updates, exclusive
              offers, and travel inspiration delivered straight to your inbox.
            </p>
            <div className="mt-6 flex gap-2 md:gap-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-white text-sm pt-10 text-center">
          © 2025 StayScape, Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
