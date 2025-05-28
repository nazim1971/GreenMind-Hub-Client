/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Idea } from '@/types/idea';
import IdeaCard from './IdeaCard';
import { getAllCategories } from '@/services/Category';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const AllIdeas = ({ ideas }: { ideas: Idea[] }) => {
  const [price, setPrice] = useState([0]);
  const [searchText, setSearchText] = useState('');
  const [pricing, setPricing] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(`${pathname}`);
    setPrice([0]);
    setSearchText('');
    setPricing('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          Explore Innovative Ideas
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover groundbreaking concepts from our community of creators and innovators.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-3xl mx-auto relative">
        <input
          className="w-full border-2 p-4 pl-12 rounded-xl
            border-gray-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-cyan-300
            dark:border-gray-700 dark:focus:ring-[#14b8a5e7] dark:bg-gray-900
            text-lg font-medium placeholder:text-gray-500 transition-all shadow-sm"
          type="text"
          onChange={e => {
            handleSearchQuery('searchTerm', e.target.value);
            setSearchText(e.target.value);
          }}
          value={searchText}
          placeholder="Search innovative ideas..."
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8 border border-teal-100 dark:border-teal-900/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
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
            Filter Options
          </h2>
          
          {searchParams.toString()?.length > 0 && (
            <Button
              onClick={clearFilters}
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-teal-200 transition-all"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Filter */}
          <div className="space-y-4">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Price Range
            </Label>
            <Slider
              max={10000}
              step={1}
              value={price}
              onValueChange={value => {
                setPrice(value);}}
              className="w-full [&_.range-slider__track]:bg-teal-200 [&_.range-slider__range]:bg-teal-400 [&_.range-slider__thumb]:bg-teal-600"
            />
            <div className="flex justify-between items-center text-sm">
              <span className="text-teal-600 dark:text-teal-400">$0</span>
              <div className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                <span className="font-bold text-teal-800 dark:text-teal-400">
                  Max: ${price[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Type */}
          <div className="space-y-4">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Pricing Type
            </Label>
            <Select
              value={pricing}
              onValueChange={value => {
                setPricing(value);
                handleSearchQuery('isPaid', value);
              }}
            >
              <SelectTrigger className="w-full border-teal-200 hover:border-teal-300">
                <SelectValue placeholder="Select pricing type" />
              </SelectTrigger>
              <SelectContent className="border-teal-50">
                <SelectGroup>
                  <SelectItem
                    value="false"
                    className="hover:bg-teal-50 dark:hover:bg-teal-600 focus:bg-teal-50 dark:focus:bg-teal-600"
                  >
                    Free Ideas
                  </SelectItem>
                  <SelectItem
                    value="true"
                    className="hover:bg-teal-50 dark:hover:bg-teal-600 focus:bg-teal-50"
                  >
                    Premium Ideas
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              Categories
            </Label>
            {!isLoading && (
              <RadioGroup className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {categories?.map(
                  (category: { id: string; name: string }) => (
                    <div
                      key={category.id}
                      className="group flex items-center space-x-3 p-2 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all cursor-pointer"
                    >
                      <RadioGroupItem
                        value={category.id}
                        id={category.id}
                        className="h-4 w-4 rounded-full border-2 border-teal-200 text-teal-300 focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 data-[state=checked]:border-teal-300 data-[state=checked]:bg-teal-300"
                        onClick={() =>
                          handleSearchQuery('categoryId', category.id)
                        }
                      />
                      <Label
                        htmlFor={category.id}
                        className="flex-1 text-gray-700 dark:text-gray-300 font-medium transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400"
                      >
                        {category.name}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
  {ideas ? ideas.length : 0} {ideas?.length === 1 ? 'Idea' : 'Ideas'} Found
</h2>
        <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>Sorted by: Most Recent</span>
        </div>
      </div>

      {/* Ideas Grid */}
      {ideas?.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-teal-100 dark:border-teal-900/50">
          <div className="mx-auto w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6">
            <svg 
              className="w-12 h-12 text-teal-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Ideas Match Your Filters
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Try adjusting your filters or check back later for new submissions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ideas?.map((idea: Idea, idx: number) => (
            <IdeaCard key={idx} idea={idea} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <nav className="flex items-center gap-2">
          <button className="px-4 py-2 border border-teal-200 dark:border-teal-800 rounded-lg text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30">
            Previous
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            1
          </button>
          <button className="px-4 py-2 border border-teal-200 dark:border-teal-800 rounded-lg text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30">
            2
          </button>
          <button className="px-4 py-2 border border-teal-200 dark:border-teal-800 rounded-lg text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AllIdeas;