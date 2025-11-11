import { Link } from "react-router";
import { RiTwitterXLine } from "react-icons/ri";
const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-100 text-base-content p-10">
        <nav>
          <Link to={"/"} className="text-xl font-bold">
            Clean <span className="text-accent">Hub</span>
          </Link>
          <p className="w-80">
            CleanHub empowers communities to report, track, and resolve local
            environmental issues. Built with an eco-friendly design and a focus
            on usability, it connects citizens, volunteers, and authorities to
            drive cleaner, greener neighborhoods.
          </p>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="#" className="link link-hover">
            About us
          </a>
          <a href="#" className="link link-hover">
            Contact
          </a>
          <a href="#" className="link link-hover">
            Jobs
          </a>
          <a href="#" className="link link-hover">
            Press kit
          </a>
        </nav>
        <nav className=" space-y-5 sm:space-y-18">
          <div>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a href="https://x.com/_____Sajid_____" target="_blank">
                <RiTwitterXLine size={25} />
              </a>
              <a href="https://www.youtube.com/" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/sajid7756" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Clean
            Hub
          </p>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
