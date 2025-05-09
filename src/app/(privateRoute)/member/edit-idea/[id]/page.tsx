import { getAllCategories, getIdea } from './_action';
import EditIdeaForm from './_components/EditIdeaForm';

const EditIdeaPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { data: categories } = await getAllCategories();
  const { id } = await params;
  const { data: idea } = await getIdea(id);

  return (
    <div>
      <EditIdeaForm categories={categories} idea={idea} />
    </div>
  );
};

export default EditIdeaPage;