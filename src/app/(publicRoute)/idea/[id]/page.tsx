
import { getSingleIdeaDetails } from "@/services/Idea";
import IdeaDetail from "./_components";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: idea } = await getSingleIdeaDetails(id);
  return (
    <div>
      <IdeaDetail idea={idea} />
    </div>
  );
};

export default BlogDetailsPage;