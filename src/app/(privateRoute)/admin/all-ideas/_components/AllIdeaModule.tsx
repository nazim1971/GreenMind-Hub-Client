import { getAllIdeasByAdmin } from '../_actions';
import IdeasTable from './IdeaTable';
const AllIdeasModule = async () => {
  const ideas = await getAllIdeasByAdmin();
  return (
    <div>
      <IdeasTable data={ideas?.data} />
    </div>
  );
};

export default AllIdeasModule;