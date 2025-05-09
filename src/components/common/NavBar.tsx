'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { logOut } from '@/services/AuthService';
import { Button } from '../ui/button';
import { Loader, LogOut, Menu, X } from 'lucide-react';
import { protectedRoutes } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avater';
import { ModeToggle } from '../theme/ModeToggle';
import { ShinyButton } from '../magicui/shiny-button';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const router = useRouter();
  const { user, setUser, isLoading } = useUser();
  const pathname = usePathname();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Idea', path: '/idea' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about-us' },
    ...(user
      ? [{ name: 'Dashboard', path: `/${user.role.toLowerCase()}/dashboard` }]
      : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-3`}
    >
      <div className="container mx-auto h-16 px-5 md:px-10">
        <div className="relative h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="logo"
                className="h-20 w-40"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-5 text-black dark:text-green-500">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className={`relative px-2 py-1 transition-all duration-300 rounded 
                    ${pathname === path
                      ? 'text-[#14B8A6] font-semibold'
                      : 'hover:text-[#14B8A6]'}`}
                >
                  {name}
                </Link>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <ModeToggle />
              {isLoading ? (
                <Loader />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user?.image ?? undefined} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <Link href={`/${user.role.toLowerCase()}/dashboard`}>
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="text-red-600 font-semibold cursor-pointer"
                    >
                      Log out <LogOut className="text-red-600 ml-2" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <ShinyButton className="bg-[#14B8A6] font-bold rounded-lg px-4 py-2 hover:animate-pulse">
                    Log In
                  </ShinyButton>
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-transparent text-black dark:text-green-500"
                  >
                    <Menu />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="text-black dark:text-green-500">
                  <div className="mx-auto w-full">
                    <DrawerHeader>
                      <DrawerTitle className="sr-only">Menu</DrawerTitle>
                      <DrawerDescription className="sr-only">
                        Nav Items.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex justify-end items-start mr-2">
                      <DrawerClose asChild>
                        <Button variant="outline">
                          <X />
                        </Button>
                      </DrawerClose>
                    </div>

                    <div className="p-4">
                      <div className="pb-3 flex flex-col justify-center items-end gap-2">
                        {navLinks.map(({ name, path }) => (
                          <Link
                            key={name}
                            href={path}
                            className={`rounded-md px-3 py-2 text-sm font-medium 
                              ${pathname === path
                                ? 'border border-[#14B8A6] text-[#14B8A6]'
                                : 'hover:bg-[#14B8A6] hover:text-white'}`}
                          >
                            {name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
