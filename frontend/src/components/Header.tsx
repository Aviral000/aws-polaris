import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Header.scss'

import { RxDropdownMenu } from "react-icons/rx";
import { MdHorizontalRule } from "react-icons/md";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface WindowSize {
  width: number;
  height: number;
}

export default function Header() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClicks = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClicks);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, []);

  useLayoutEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(menuRef.current, { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" });
      }
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let isLargeScreen = windowSize.width > 750;

  return (
    <header className='header'>
      <div className={isLargeScreen && !menuOpen ? 'A1' : 'A2'}>
        <div className='B1'>
            <img src='https://webstockreview.net/images/newspaper-clipart-newspaper-reader-7.png' alt='logo' />
            <div style={{ fontSize: "1.5rem" }}>
              <div>Polaris</div>
              <div style={{ fontSize: ".5rem" }}>THE TASK REMINDER</div>
            </div>
        </div>
        { windowSize.width > 750 ? (
          <div className='B2'>
            <Link to='/about'>About</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>SignUp</Link>
          </div>
        ) : (
          <div className='B3'>
            <button className='C1' type='button' onClick={toggleMenu}>
              {!menuOpen ? (
                <RxDropdownMenu style={{ color: 'black' }} />
              ) : (
                <MdHorizontalRule style={{ color: 'black' }} />
              )
            }
            </button>
            {menuOpen && (
              <div ref={menuRef} className='dropdown-menu'>
                <Link to='/about'>About</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}