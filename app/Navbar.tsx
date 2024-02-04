'use client';
import { NavbarLink } from '@/model/navbarLinks';
import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();

  const links: NavbarLink[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Issues',
      href: '/issues/list',
    },
  ];
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href="/api/auth/signout"> Log Out</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Log In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
