// components/Header.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '1em',
      backgroundColor: '#000000',
      color: 'white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }}>
      {/* Navbar Button */}
      <button onClick={toggleNavbar} style={{
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '2em',
        cursor: 'pointer',
        position: 'absolute',
        left: '1em',
      }}>
        &#9776; {/* Hamburger icon */}
      </button>

      {/* Logo and App Title (Centered) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}>
        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Beat the Heat</div>
      </div>

      {/* Search Bar */}
      <div style={{
        position: 'absolute',
        right: '1em',
      }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: '0.7em',
            borderRadius: '10px',
            border: '2px solid #007BFF',
            outline: 'none',
            fontSize: '1em',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      {/* Navbar Options */}
      {isNavOpen && (
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '4em',
          left: '1em',
          backgroundColor: '#000000',
          padding: '1.5em',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: '100',
        }}>
          {[
            { label: 'Sensors', path: '/sensors' },
            { label: 'Views', path: '/views' },
            { label: 'Location Comparison', path: '/LocationComparison' },
            { label: 'Historical Data', path: '/HistoricalData' },
            { label: 'Settings', path: '/settings' },
            { label: 'Help/Info', path: '/help-info' },
            { label: 'Download Data', path: '/DownloadData' },
            { label: 'Home', path: '/' },
          ].map((item, index) => (
            <Link key={index} href={item.path} passHref>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: '1.2em',
                marginBottom: '0.7em',
                padding: '0.7em',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
                onMouseOver={(e) => e.target.style.background = '#333'}
                onMouseOut={(e) => e.target.style.background = 'none'}
                onClick={() => setIsNavOpen(false)} // Close navbar after selection
              >
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Header;
