/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../ui/card';
import Image from 'next/image';
import { getByVotes } from '@/services/Idea';
import u1 from '../../assets/u1.avif';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const TestimonialSection = async () => {
  const { data: testimonials } = await getByVotes();

  return (
    <section className="py-16 px-2 sm:px-4 mt-8 bg-gradient-to-br from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-950">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-3">
        💬 What Our Users Say
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base text-center mb-10">
        Real voices from changemakers who are building a more sustainable future with us.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials?.slice(0, 3).map((idea: any, idx: number) => (
          <Card
            key={idx}
            className="relative group overflow-hidden rounded-2xl bg-white/90 dark:bg-zinc-800/70 backdrop-blur-md border border-gray-200 dark:border-zinc-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-transparent hover:ring-2 hover:ring-teal-400/40 max-w-[350px] mx-auto"
          >

            <CardFooter className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-600">
                  <Image
                    src={idea.author.image || u1}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-left">
                  <CardTitle className="text-sm font-medium text-zinc-800 dark:text-white">
                    {idea.author?.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    @{idea.author?.email.split('@')[0]}
                  </p>
                </div>
              </CardFooter>

               <Separator className="my-1" />
               
            <CardContent className="p-5 space-y-4">
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-xs px-2 py-1"
              >
                {idea.category?.name}
              </Badge>

              {idea.images?.length > 0 && (
                <div className="flex justify-center gap-2 mt-1">
                  {idea.images.map((img: any, index: number) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Project image ${index + 1}`}
                      height={60}
                      width={60}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-300 dark:border-zinc-600"
                    />
                  ))}
                </div>
              )}

              <h3 className="text-base font-semibold mt-2 text-teal-700 dark:text-teal-300">
                {idea.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {idea.description?.slice(0, 100)}...
              </p>

             

              
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
