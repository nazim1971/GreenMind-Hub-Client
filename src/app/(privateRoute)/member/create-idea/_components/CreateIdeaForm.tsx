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
import { category } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createAnIdea, draftAnIdea } from '../_action';
import { ideaDraftSchema } from './IdeaValidation';
import { useRouter } from 'next/navigation';
import TGImageUploader from '@/components/ui/ImageUploader';
import ImagePreviewer from '@/components/ui/ImageUploader/ImagePreviewer';
const CreateIdeaForm = ({ categories }: { categories: category[] }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [isDrafting, setIsDrafting] = useState(true);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ideaDraftSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleIdeaSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isDrafting) {
      if (!data.title || data.title.trim()?.length < 10) {
        toast.error("Title must be at least 10 characters for a draft.");
        return;
      }

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      for (const file of imageFiles) {
        formData.append("images", file);
      }

      try {
        const res = await draftAnIdea(formData);
        if (res?.success) {
          toast.success("Idea added to draft successfully!");
          router.push(`/idea/${res?.data?.id}`); // or to draft page
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to draft idea.");
      }
      return;
    }

    // Create Idea Mode
    if (imageFiles?.length < 0) {
      toast.error("Please select at least 1 image!");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (const file of imageFiles) {
      formData.append("images", file);
    }

    try {
      const res = await createAnIdea(formData);
      if (res?.success) {
        toast.success(res?.message);
        router.push(`/idea/${res?.data?.id}`);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create idea.");
    }
  };


  return (
    <div className="p-4 md:p-0 ">
      <h1 className="text-3xl text-center mb-6">Create Idea</h1>
      <div className="flex justify-center h-screen  mx-auto">
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
                      value={field.value ?? ""}
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
                      value={field.value ?? ""}
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
                      value={field.value ?? ""}
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
                      value={field.value ?? ""}
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
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Images"
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
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full border border-input bg-background px-3 py-2 rounded-md"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.map((category) => (
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
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                  ? "Saving Draft..."
                  : "Add to Draft"}
              </Button>

              <Button
                type="submit"
                onClick={() => setIsDrafting(false)}
                disabled={
                  isSubmitting ||
                  
                  imageFiles?.length < 1
                }
              >
                {isSubmitting && !isDrafting ? "Creating..." : "Create Idea"}
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateIdeaForm;