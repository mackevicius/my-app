'use client';
import { NavbarLink } from '@/model/navbarLinks';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
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
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    size="3"
                    radius="full"
                    src={session.user!.image!}
                    fallback="?"
                    className="cursor-pointer"
                  ></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <Text size="2">
                    <DropdownMenu.Label>
                      {session.user!.email}
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Log Out</Link>
                    </DropdownMenu.Item>
                  </Text>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
