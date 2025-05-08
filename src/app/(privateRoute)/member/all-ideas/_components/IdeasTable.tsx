import { DataTable } from './data-table';
import { TIdea } from '@/types';

const IdeasTable = ({ ideas = [] }: { ideas: TIdea[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Ideas</h1>
      <div className="overflow-x-auto">
        <DataTable ideas={ideas} />
      </div>
    </div>
  );
};

export default IdeasTable;