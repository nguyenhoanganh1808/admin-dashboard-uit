'use client';

import { useActionState, useState, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import type React from 'react'; // Added import for React
import { createPost } from '../../actions';
import BackButton from '@/components/ui/back-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PostUploadForm() {
  const [topics, setTopics] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [state, action, pending] = useActionState(createPost, {
    type: '',
    text: ''
  });

  const handleTopicChange = (topicId: string) => {
    const id = parseInt(topicId, 10); // Convert to number
    setTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const topicsData = [
    { id: 1, name: 'Software Development', description: 'string' },
    { id: 2, name: 'Machine Learning', description: 'string' },
    { id: 3, name: 'Information Technology', description: 'string' },
    { id: 4, name: 'Q&A', description: 'string' }
  ];

  return (
    <form
      action={action}
      className="space-y-6 p-6 pt-0 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-row items-center">
        <BackButton />
        <p className="font-semibold text-lg">Create a new post</p>
      </div>
      <div>
        <Label htmlFor="content">Post Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your post content here..."
          className="mt-1"
          rows={5}
        />
      </div>

      <div>
        <Label htmlFor="topics">Topics (Select multiple)</Label>
        <Select onValueChange={handleTopicChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select topics" />
          </SelectTrigger>
          <SelectContent>
            {topicsData.map((topic) => (
              <SelectItem key={topic.id} value={topic.id.toString()}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {topics.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((id) => {
              const topic = topicsData.find((t) => t.id === id);
              return (
                <span
                  key={id}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {topic?.name}
                </span>
              );
            })}
          </div>
        )}
        {topics.map((id, index) => (
          <input key={index} type="hidden" name="topics[]" value={id} />
        ))}
      </div>

      <div>
        <Label htmlFor="files">Attach Files</Label>
        <input
          id="files"
          name="files"
          type="file"
          onChange={handleFileChange}
          multiple
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {files.length > 0 && (
          <ul className="mt-2 text-sm text-gray-500">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <Label htmlFor="images">Upload Images</Label>
        <input
          id="images"
          name="images"
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview || '/placeholder.svg'}
                  alt={`preview ${index}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {state.text !== '' && (
        <Alert variant={state.type === 'success' ? 'default' : 'destructive'}>
          {state.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {state.type === 'success' ? 'Success' : 'Error'}
          </AlertTitle>
          <AlertDescription>{state.text}</AlertDescription>
        </Alert>
      )}

      <Button
        disabled={pending}
        type="submit"
        className={`w-full ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Upload Post
      </Button>
    </form>
  );
}
