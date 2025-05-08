/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { getAllCategories } from '@/services/Category';

const FilterSidebar = () => {
  const [price, setPrice] = useState([0]);
  const [searchText, setSearchText] = useState('');
  const [pricing, setPricing] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: categoriesData } = await getAllCategories();
        setCategories(categoriesData);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 items-center px-10 my-10">
      <div className="relative w-full sm:max-w-xl">
        <input
          className="w-full border-2 p-3 pl-12 rounded-lg
        border-gray-200 hover:border-green-300 focus:border-green-500 
        focus:ring-1 focus:ring-green-200 dark:border-gray-700
        dark:focus:ring-green-600/50 dark:bg-gray-900
        text-lg font-medium transition-colors"
          type="text"
          onChange={e => {
            // const searchValue = encodeURIComponent(e.target.value);
            router.push(`${pathname}`);
            handleSearchQuery('searchTerm', e.target.value);
            setSearchText(e.target.value);
          }}
          value={searchText}
          placeholder="Search innovative ideas..."
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="px-8 py-6 bg-white hover:bg-green-50 
            border-2 border-green-200 hover:border-green-300 
            text-green-700 hover:text-green-900 font-semibold
            flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
            {searchParams.toString()?.length > 0 && (
              <span
                className="bg-green-100 text-green-700 
              rounded-full px-2 py-1 text-xs font-medium"
              >
                {Array.from(searchParams.entries())?.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[80%] sm:w-[400px] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-green-900 dark:text-green-400 border-b-2 border-green-200 pb-4">
              🔍 Idea Explorer Filters
            </SheetTitle>
            <SheetDescription asChild>
              <div className="py-5 space-y-8">
                {/* Clear Filters */}
                <div className="text-right">
                  {searchParams.toString()?.length > 0 && (
                    <Button
                      onClick={() => {
                        router.push(`${pathname}`);
                        setPrice([0]);
                        setSearchText('');
                        setPricing('');
                      }}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-200 transition-all"
                    >
                      🗑️ Clear All Filters
                    </Button>
                  )}
                </div>

                {/* Price Filter Section */}
                <div className="p-6 bg-white dark:bg-transparent rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="bg-green-100 dark:bg-transparent p-2 rounded-lg">💰</div>
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-400">
                      Price Range
                    </h3>
                  </div>

                  <Slider
                    max={50000}
                    step={1}
                    value={price}
                    onValueChange={value => {
                      setPrice(value);
                      handleSearchQuery('price', value[0]);
                    }}
                    className="w-full [&_.range-slider__track]:bg-green-200 [&_.range-slider__range]:bg-green-400 [&_.range-slider__thumb]:bg-green-600"
                  />

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-green-600 dark:text-green-400">Current max:</span>
                    <div className="px-3 py-1 bg-green-100 dark:bg-transparent rounded-full">
                      <span className="font-bold text-green-800 dark:text-green-400">
                        ${price[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing Type Section */}
                <div className="p-6 bg-white rounded-xl dark:bg-transparent shadow-sm hover:shadow-md transition-shadow border border-green-100">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="bg-green-100 p-2 dark:bg-transparent rounded-lg">🏷️</div>
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-400">
                      Pricing Type
                    </h3>
                  </div>

                  <Select
                    value={pricing}
                    onValueChange={value => {
                      setPricing(value);
                      handleSearchQuery('isPaid', value);
                    }}
                  >
                    <SelectTrigger className="w-full border-green-200 hover:border-green-300">
                      <SelectValue placeholder="Select pricing type" />
                    </SelectTrigger>
                    <SelectContent className="border-green-50">
                      <SelectGroup>
                        <SelectItem
                          value="false"
                          className="hover:bg-green-50 dark:hover:bg-green-600 focus:bg-green-50 dark:focus:bg-green-600"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-green-500">🌱</span>
                            Free Ideas
                          </span>
                        </SelectItem>
                        <SelectItem
                          value="true"
                          className="hover:bg-green-50 dark:hover:bg-green-600 focus:bg-green-50"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-green-500">💎</span>
                            Premium Ideas
                          </span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Categories Section */}
                <div className="p-6 bg-white dark:bg-transparent rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="bg-green-100 p-2 rounded-lg">📚</div>
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-400">
                      Categories
                    </h3>
                  </div>

                  {!isLoading && (
                    <RadioGroup className="space-y-3">
                      {categories?.map(
                        (category: { id: string; name: string }) => (
                          <div
                            key={category.id}
                            className="group flex items-center space-x-3 p-3 hover:bg-green-600  rounded-lg transition-all cursor-pointer border border-transparent hover:border-green-200"
                          >
                            <RadioGroupItem
                              value={category.id}
                              id={category.id}
                              className="h-5 w-5 rounded-full border-2 border-green-200 text-green-300 focus:ring-2 focus:ring-green-200 focus:ring-offset-2 data-[state=checked]:border-green-300 data-[state=checked]:bg-green-300"
                              onClick={() =>
                                handleSearchQuery('categoryId', category.id)
                              }
                            />
                            <Label
                              htmlFor={category.id}
                              className="flex-1 text-green-800 dark:text-green-400   font-medium transition-colors group-hover:text-white data-[state=checked]:text-green-900 flex items-center gap-2"
                            >
                              <span className="flex-1">{category.name}</span>
                              <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                →
                              </span>
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  )}
                </div>

                {/* Visual Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      {/* Clear Filters */}
      <div>
        {searchParams.toString()?.length > 0 && (
          <Button
            onClick={() => {
              router.push(`${pathname}`);
              setPrice([0]);
              setSearchText('');
              setPricing('');
            }}
            className="px-8 py-6 bg-red-50 hover:bg-red-100 
          text-red-600 hover:text-red-700 border-2 border-red-100 
          hover:border-red-200 font-semibold flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
export default FilterSidebar;