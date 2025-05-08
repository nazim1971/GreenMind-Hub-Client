/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    CardContent,
    CardFooter,
    // CardHeader,
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
      <section className="py-16 px-4 text-center mt-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          💬 What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
          Real voices from changemakers who are building a more sustainable future
          with us.
        </p>
  
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials?.slice(0, 3).map((idea: any, idx: number) => (
            <Card
              key={idx}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl shadow-lg transition hover:shadow-xl"
            >
              <CardContent className="space-y-8">
                <div>
                  <Badge variant="secondary">{idea.category?.name}</Badge>
                  <h3 className="text-xl font-semibold mt-4 mb-6">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {idea.description?.slice(0, 85)}...
                  </p>
                </div>
  
            
  
                <div className="flex gap-2 justify-center">
                  {idea.images?.map((img: any, index: number) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Project image ${index + 1}`}
                      height={1200}
                      width={1200}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
                <Separator />
                <CardFooter>
                  <div className="flex justify-center items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Image
                        src={idea.author.image || u1}
                        width={40}
                        height={40}
                        alt="avater"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {idea.author?.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        ...@{idea.author?.email.split('@')[1]}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  };
  
  export default TestimonialSection;