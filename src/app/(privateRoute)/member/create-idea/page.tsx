import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateIdeaModule from './_components/CreateIdeaModule'

const CreateIdeaPage = () => {
  return (
    <Suspense
          fallback={
            <div className="flex size-full min-h-dvh items-center justify-center ">
              <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
            </div>
          }
        >
          <CreateIdeaModule />
        </Suspense>
  )
}
export default CreateIdeaPage