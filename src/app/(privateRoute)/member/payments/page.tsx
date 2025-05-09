import { LoaderCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import PaymentModule from './_components/PaymentModule'


const CreateIdeaPage = () => {
  return (
    <Suspense
          fallback={
            <div className="flex size-full min-h-dvh items-center justify-center">
              <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
            </div>
          }
        >
          <PaymentModule />
        </Suspense>
  )
}

export default CreateIdeaPage