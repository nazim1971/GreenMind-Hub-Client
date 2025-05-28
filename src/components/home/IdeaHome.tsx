/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllIdeas } from '@/services/Idea';
import IdeaHomeCards from './IdeaHomeCars';

const IdeaHome = async () => {
  const { data: ideas } = await getAllIdeas();

  return (
    <div className="flex flex-col justify-center items-center my-16">
      <section className="text-center py-12">
        <h2 className="text-4xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Featured Sustainability Ideas
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Discover community-powered projects tackling real-world environmental
          problems from solar panels to urban gardens and everything in between.
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 gap-10">
        {ideas?.slice(0, 8).map((idea: any, idx: number) => (
          <IdeaHomeCards key={idx} idea={idea}></IdeaHomeCards>
        ))}
      </div>
    </div>
  );
};

export default IdeaHome;
