
import AllIdeas from '@/components/Idea/AllIdea';
import Pagination from '@/components/Pagination';
import { getAllIdeas } from '@/services/Idea';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllIdeasPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
 
  const { data: ideas, meta } = await getAllIdeas(
    query.page as string,
    '12',
    query
  );

  return (
    <div>
      <AllIdeas ideas={ideas} />
      <Pagination page={Number(query.page)} totalPage={meta?.totalPage} />
    </div>
  );
};

export default AllIdeasPage;