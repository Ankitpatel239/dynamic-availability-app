import React from "react";

const Footer = () => {
  return (
    // <footer >
    //   <p classNameName="text-center  py-3"> Copyright © 2024 | Ankit Patel .</p>
    // </footer>
    <footer
      className="px-4 py-4 border-t md:px-6 bg-card text-card-foreground"
      data-id="112"
    >
      <div
        className="max-w-5xl mx-auto flex items-center justify-between"
        data-id="113"
      >
        <p className="text-xs text-muted-foreground" data-id="114">
          © 2024 Availability Scheduler |{" "}
          <a
            href="https://ankit-portfolio-web.onrender.com"
            className="text-blue-500 hover:underline"
          >
            Ankit Web Developer
          </a>{" "}
          All rights reserved.
        </p>
        <nav className="flex items-center gap-4" data-id="115">
          <a
            data-id="116"
            className="text-muted-foreground hover:text-card-foreground"
            href="/privacy"
            rel="ugc"
          >
            Privacy
          </a>
          <a
            data-id="117"
            className="text-muted-foreground hover:text-card-foreground"
            href="/terms"
            rel="ugc"
          >
            Terms
          </a>
          <a
            data-id="118"
            className="text-muted-foreground hover:text-card-foreground"
            href="/contact"
            rel="ugc"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
