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
import { Skeleton } from '@/app/components';

const Navbar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <UserMenu />
        </Flex>
      </Container>
    </nav>
  );
};

const UserMenu = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            size="2"
            radius="full"
            src={session!.user!.image!}
            fallback="?"
            className="cursor-pointer"
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size="2">
            <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log Out</Link>
            </DropdownMenu.Item>
          </Text>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const path = usePathname();

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
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': link.href === path,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
