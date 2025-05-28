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
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { logOut } from '@/services/AuthService';
import { Button } from '../ui/button';
import { Loader, LogOut, Menu, Search,  X } from 'lucide-react';
import { protectedRoutes } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avater';
import { ModeToggle } from '../theme/ModeToggle';
import { ShinyButton } from '../magicui/shiny-button';
import { useEffect, useState } from 'react';
import { DialogTitle } from '../ui/dialog';
import CartButton from './CartButton';

const NavBar = () => {
  const router = useRouter();
  const { user, setUser, isLoading } = useUser();
  const pathname = usePathname();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log('Searching for:', searchQuery);
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
      className={`fixed w-full dark:bg-gray-900 top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-3 `}
    >
      <div className="container dark:bg-gray-900 mx-auto h-16 px-5 md:px-10 ">
        <div className="relative h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="logo"
                className="h-14 w-32 md:h-20 md:w-40"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <form 
              onSubmit={handleSearch}
              className="hidden xl:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search..."
                className="pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] dark:bg-gray-800 dark:text-white w-48 lg:w-64 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 text-gray-500 dark:text-gray-400 hover:text-[#14B8A6]"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <div className="hidden lg:flex gap-5 text-black dark:text-white">
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
            {/* cart button */}
                <CartButton/>
            

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

            <div className="lg:hidden">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-800 dark:text-[#14B8A6] hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Menu className="w-10 h-10" />
                  </Button>
                </DrawerTrigger>

                <DrawerContent className="text-gray-800 dark:text-white bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 max-w-[280px]">
                  <div className="w-full h-full flex flex-col">
                    <DrawerHeader className=" px-4 pt-4">
                     <div className='flex justify-between items-center'>
                       <div>
                        <DialogTitle/>
                        <Link href="/" className="w-fit">
                          <Image src={logo} alt="logo" className="h-16 w-auto" />
                        </Link>
                      </div>

                      <div>
                        <DrawerClose asChild>
                        <Button
                          size="lg"
                          variant="ghost"
                          className="text-gray-700  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </DrawerClose>
                      </div>
                     </div>
                    </DrawerHeader>

                    {/* Search Bar - Mobile */}
                    <form 
                      onSubmit={handleSearch}
                      className="px-4 py-3 flex items-center relative"
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] dark:bg-gray-800 dark:text-white w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                        type="submit"
                        className="absolute right-6 text-gray-500 dark:text-gray-400 hover:text-[#14B8A6]"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </form>

                    <div className="flex-1 px-4 py-3 overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        {navLinks.map(({ name, path }) => (
                          <DrawerClose asChild key={name}>
                            <Link
                              href={path}
                              className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-all duration-150
                                ${
                                  pathname === path
                                    ? 'bg-[#14b8a532]  dark:bg-[#14B8A6] dark:text-white'
                                    : 'hover:bg-[#14b8a532] dark:hover:bg-[#14B8A6]  dark:hover:text-white'
                                }`}
                            >
                              {name}
                            </Link>
                          </DrawerClose>
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