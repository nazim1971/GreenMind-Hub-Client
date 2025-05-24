import FilterSideBar from '@/components/Idea/FilterSideBar';
import { Idea } from '@/types/idea';
import IdeaCard from './IdeaCard';


const AllIdeas = ({ ideas }: { ideas: Idea[] }) => {
  return (
    <div className="flex flex-col gap-3 my-10">
      <FilterSideBar />

      <div className="mx-4 lg:mx-10">
        {ideas?.length === 0 ? (
          <h3 className="text-xl font-bold text-center">No Idea found</h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 lg:gap-7 mx-auto">
            {ideas?.map((idea: Idea, idx: number) => (
              <IdeaCard key={idx} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIdeas;