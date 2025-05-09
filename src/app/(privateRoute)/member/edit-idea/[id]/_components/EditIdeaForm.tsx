/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { category, TIdea } from '@/types';
// import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createAnIdea, draftAnIdea } from '../_action';
import {
  ideaCreationSchema,
  ideaDraftSchema,
} from '../../../create-idea/_components/IdeaValidation';
import TGImageUploader from '@/components/ui/ImageUploader';
import ImagePreviewer from '@/components/ui/ImageUploader/ImagePreviewer';

const EditIdeaForm = ({
  categories,
  idea,
}: {
  categories: category[];
  idea: TIdea;
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [isDrafting, setIsDrafting] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (idea?.images && idea.images?.length > 0) {
      setImagePreview(idea?.images);
    }
  }, [idea]);

  const form = useForm({
    // resolver: zodResolver(ideaDraftSchema),
    defaultValues: {
      title: idea?.title || '',
      problemStatement: idea?.problemStatement || '',
      solution: idea?.solution || '',
      description: idea?.description || '',
      categoryId: idea?.categoryId || '',
      price: idea?.price || 0,
      id: idea?.id || '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleIdeaSubmit: SubmitHandler<FieldValues> = async data => {
    const activeSchema = isDrafting ? ideaDraftSchema : ideaCreationSchema;
    const validation = activeSchema.safeParse(data);

    if (!validation.success) {
      const errors = validation.error.format();
      const firstField = Object.keys(errors)[0];
      const errorMessage =
        (typeof errors[firstField as keyof typeof errors] === 'object' &&
          '_errors' in (errors[firstField as keyof typeof errors] ?? {}) &&
          ((errors[firstField as keyof typeof errors] as { _errors: string[] })
            ._errors?.[0] ??
            'Validation error')) ||
        'Validation error';

      toast.error(errorMessage);
      return;
    }

    if (!isDrafting && imagePreview.length < 1) {
      toast.error('At least one image is required to publish');
      return;
    }

    const formData = new FormData();

    const updatedData = {
      ...data,
      images: imagePreview.filter(url => url.startsWith('http')), // old images
    };

    console.log({ updatedData });

    formData.append('data', JSON.stringify(updatedData));

    // only new upload images are here
    for (const file of imageFiles) {
      formData.append('images', file);
    }

    try {
      const res = isDrafting
        ? await draftAnIdea(formData)
        : await createAnIdea(formData);

      if (res?.success) {
        toast.success(res?.message);
        router.push(`/idea/${res?.data?.id}`);
      } else {
        toast.error(res?.message || 'Action failed.');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        isDrafting ? 'Failed to draft idea.' : 'Failed to publish idea.'
      );
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Edit Idea</h1>
      <div className="flex justify-center h-screen mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleIdeaSubmit)}
            className="space-y-4 w-full md:w-2/3 text-center"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idea Title:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter idea title"
                      {...field}
                      // defaultValue={data?.title || ""}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="problemStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter idea problem statement"
                      {...field}
                      // defaultValue={data?.problemStatement || ""}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter idea solution"
                      {...field}
                      // defaultValue={data?.solution || ""}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter idea description"
                      {...field}
                      // defaultValue={data?.description || ""}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className="text-primary font-bold text-xl text-center border-t border-b py-3 my-5">
                Images
              </p>

              <div className="flex gap-4">
                <TGImageUploader
                  setImageFiles={files => {
                    setImageFiles(files);
                  }}
                  setImagePreview={previews => {
                    setImagePreview(previews);
                  }}
                  label="Upload New Images"
                  className="w-fit mt-0"
                />
                <ImagePreviewer
                  className="flex flex-wrap gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category:</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      // defaultValue={data?.categoryId || ""}
                      value={field.value || ''}
                      onChange={e => field.onChange(e.target.value)}
                      className="w-full border border-input bg-background px-3 py-2 rounded-md"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter idea price"
                      // defaultValue={data?.price || 0}
                      value={field.value ?? ''}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-4 mt-4 mb-20">
              <Button
                type="button"
                onClick={() => {
                  setIsDrafting(true);
                  form.handleSubmit(handleIdeaSubmit)();
                }}
                disabled={isSubmitting}
                variant="outline"
              >
                {isSubmitting && isDrafting
                  ? 'Saving Draft...'
                  : 'Add to Draft'}
              </Button>

              <Button
                type="submit"
                onClick={() => setIsDrafting(false)}
                disabled={isSubmitting || imagePreview.length < 1}
              >
                {isSubmitting && !isDrafting ? 'Publishing...' : 'Publish Idea'}
              </Button>
            </div>

           
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditIdeaForm;