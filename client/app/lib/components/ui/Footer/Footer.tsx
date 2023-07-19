import Link from 'next/link';
import React from 'react';
import { BiEnvelope, BiLogoGithub, BiLogoLinkedin } from 'react-icons/bi';

import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        {/* Site info */}
        <div className='footer-flex-container'>
          <div className='footer-about-us'>
            <h2>About Us</h2>
            <p>
              {"We're"} are reimagining how you buy sell and rent. {"It's"} now
              easier to get a place you love. So {"let's"} do this together.
            </p>
          </div>

          <div className='footer-li-container'>
            <h2>Quick Links</h2>

            <ul>
              <li>
                <Link href={'/about'}>About us</Link>
              </li>

              <li>
                <Link href={'/contact'}>Contact us</Link>
              </li>

              <li>
                <Link href={'/about'}>Blogs</Link>
              </li>
            </ul>
          </div>

          <div className='footer-li-container'>
            <h2>Contact Us</h2>

            <ul>
              <li>adejaredaniel12@gmail.com</li>

              <li>Adejare Street, Ifo, Ogun State</li>

              <li>+2348023720580</li>
            </ul>
          </div>

          <div className='social-links'>
            <h2>Follow Us</h2>

            <ul>
              <li>
                <a href='https://github.com/daniel-dunsin' target={'_blank'}>
                  <BiLogoGithub />
                </a>
              </li>
              <li>
                <a href='mailto:adejaredaniel12@gmail.com' target={'_blank'}>
                  <BiEnvelope />
                </a>
              </li>
              <li>
                <a href='https://linkedin.com' target={'_blank'}>
                  <BiLogoLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='copyright'>
          <p>
            &copy; Developed by{' '}
            <a href='https://github.com/daniel-dunsin' target={'_blank'}>
              Adejare Daniel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
