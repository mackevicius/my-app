'use client';
import { NavbarLink } from '@/model/navbarLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';

const Navbar = () => {
  const path = usePathname();

  const links: NavbarLink[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Issues',
      href: '/issues',
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                'text-zinc-900': path === link.href,
                'text-zinc-500': path !== link.href,
                'hover:text-zinc-800 transition-colors': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
