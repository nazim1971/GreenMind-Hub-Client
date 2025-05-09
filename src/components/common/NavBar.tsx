'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import logo from '@/assets/sLogo.png';
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
import { InteractiveHoverButton } from '../Button/hover-button';

const NavBar = () => {
  const router = useRouter();
  const { user, setUser, isLoading } = useUser();
  const pathname = usePathname();

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
      // localStorage.clear();
      //  sessionStorage.clear();
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

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-3">
      <div className="container mx-auto h-16 px-5 md:px-10">
        <div className="relative h-16 md:h-20">
          {/* <!-- Menu & Small Device for Small Device--> */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <Drawer>
              {/* <!-- Menu for Small Device--> */}
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
                    {/* NavItems for Small Device */}
                    <div className="pb-3 flex flex-col justify-center items-end gap-2">
                      {navLinks.map(({ name, path }) => (
                        <Link
                          key={name}
                          href={path}
                          className={
                            pathname === path
                              ? "rounded-md border border-black text-green-500 dark:text-white  dark:border-green-500 px-3 py-2 text-sm font-medium"
                              : "rounded-md border border-transparent px-3 py-2 text-sm font-medium hover:bg-green-500 hover:text-black"
                          }
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

          {/* logo, NavItems, Profile dropdown for Large Device */}
          <div className="flex justify-between items-center h-full">
            {/* logo for all */}
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="hidden md:flex text-2xl font-black items-center"
              >
                <div className="relative flex items-center h-12 ml-5 w-fit">
                  <p className="text-black dark:text-white text-lg font-medium z-10">
                    ThinkGreenly
                  </p>
                  <Image
                    src={logo}
                    alt="logo"
                    className="absolute left-[85px] -top-1 h-12 w-12"
                  />
                </div>
              </Link>
            </div>
            {/* NavItems for Large Device */}
            <div className="hidden md:block text-black dark:text-green-500">
              <div className="flex space-x-2 md:space-x-5">
                {navLinks.map(({ name, path }) => (
                  <div className="relative group" key={name}>
                    <Link
                      key={name}
                      href={path}
                      className={
                        pathname === path
                          ? "border-b-2 border-green-300 dark:text-white"
                          : "border-b-0  dark:text-white hover:text-green-700 dark:hover:text-green-300"
                      }
                    >
                      {name}
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-300 transition-all duration-300 group-hover:w-full"></span>
                  </div>
                ))}
              </div>
            </div>
            {/* <!-- Profile dropdown for Large Device --> */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-6">
              <div className="flex gap-10">
                <ModeToggle />

                {isLoading ? (
                  <Loader/>
                ) : user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage src={user?.image ?? undefined}  alt="@shadcn" />
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
                          Log out <LogOut className="text-red-600" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Link href="/login">
                    <InteractiveHoverButton
                      className="bg-green-500 font-bold rounded-lg px-4 py-2"
                    >
                      Log In
                    </InteractiveHoverButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;