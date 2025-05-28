
import { TIdea } from '@/types';
import { MemberIdeaTable } from './DataTable';

const IdeasTable = ({ ideas = [] }: { ideas: TIdea[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">All Ideas ({ideas.length})</h1>
      <div className="overflow-x-auto ">
        <MemberIdeaTable ideas={ideas} />
      </div>
    </div>
  );
};

export default IdeasTable;