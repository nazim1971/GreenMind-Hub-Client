import CreateIdeaForm from './CreateIdeaForm';
import { getAllCategories } from '../_action';

const CreateIdeaModule = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div >
      <CreateIdeaForm categories={categories} />
    </div>
  );
};

export default CreateIdeaModule;