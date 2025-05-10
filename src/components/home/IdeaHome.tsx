/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllIdeas } from "@/services/Idea";
import IdeaHomeCards from "./IdeaHomeCars";

const IdeaHome = async () => {
  const { data: ideas } = await getAllIdeas();

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="text-center py-12">
        <h2 className="text-4xl sm:text-4xl font-bold tracking-tight text-[#14B8A6] dark:text-[#5eead4]">
          Innovative Green Solutions for a Better Future
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-gray-700 dark:text-gray-300">
          Explore groundbreaking ideas and initiatives that are reshaping the
          future of our planet, from sustainable energy to eco-friendly
          technologies and community-driven conservation efforts.
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-10">
        {ideas?.map((idea: any, idx: number) => (
          <IdeaHomeCards key={idx} idea={idea}></IdeaHomeCards>
        ))}
      </div>
    </div>
  );
};

export default IdeaHome;
