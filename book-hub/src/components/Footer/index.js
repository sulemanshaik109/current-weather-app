import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="icons-list">
      <li className="list-item">
        <FaGoogle color="#3D3C3C" size={14} />
      </li>
      <li className="list-item">
        <FaTwitter color="#3D3C3C" size={14} />
      </li>
      <li className="list-item">
        <FaInstagram color="#3D3C3C" size={14} />
      </li>
      <li className="list-item">
        <FaYoutube color="#3D3C3C" size={14} />
      </li>
    </ul>
    <p className="contact-us-text">Contact Us</p>
  </div>
)

export default Footer
