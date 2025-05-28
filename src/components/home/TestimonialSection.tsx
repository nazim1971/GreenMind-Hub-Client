/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import { getByVotes } from "@/services/Idea";
import u1 from "../../assets/u1.avif";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const TestimonialSection = async () => {
  const { data: testimonials } = await getByVotes();

  return (
    <section className="py-16 px-6 md:px-8 mt-20 bg-[#F4FAF7] rounded-2xl dark:bg-gray-900">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-3">
        💬 What Our Users Say
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base text-center mb-10">
        Real voices from changemakers who are building a more sustainable future
        with us.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials?.slice(0, 3).map((idea: any, idx: number) => (
          <Card
            key={idx}
            className="relative group overflow-hidden rounded-2xl  bg-white/90 dark:bg-gray-800 backdrop-blur-md border border-gray-200 dark:border-zinc-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-transparent hover:ring-2 hover:ring-teal-400/40  mx-auto p-3 md:p:5"
          >
            <CardFooter className="flex items-center gap-3 pt-5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-zinc-600">
                <Image
                  src={idea.author.image || u1}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="text-left">
                <CardTitle className="text-lg font-medium text-zinc-800 dark:text-white">
                  {idea.author?.name}
                </CardTitle>
                <p className=" text-muted-foreground">
                  @{idea.author?.email.split("@")[0]}
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
                <div className="flex justify-center gap-4 mt-1">
                  {idea.images.map((img: any, index: number) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Project image ${index + 1}`}
                      height={80}
                      width={80}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-zinc-600"
                    />
                  ))}
                </div>
              )}

              <h3 className="text-lg font-semibold mt-2 text-teal-700 dark:text-teal-300">
                {idea.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {/* Mobile (default) - 10 words */}
                <span className="inline lg:hidden">
                  {idea.description?.split(" ").slice(0, 10).join(" ")}...
                </span>

                {/* Medium screens and up - 20 words */}
                <span className="hidden lg:inline">
                  {idea.description?.split(" ").slice(0, 15).join(" ")}...
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
