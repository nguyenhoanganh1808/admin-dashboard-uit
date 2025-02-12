import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileIcon } from 'lucide-react';
import BackButton from '@/components/ui/back-button';

export interface PostDetailProps {
  content: string;
  topics: string[];
  files: { fileName: string; url: string }[];
  images: { url: string; fileName: string }[];
}

export default function PostDetail({
  content,
  topics,
  files,
  images
}: PostDetailProps) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row">
        <div className="w-fit">
          <BackButton />
        </div>
        <CardTitle className="text-center text-lg">Post Detail</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Content</h3>
          <p className="whitespace-pre-wrap">{content}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Attached Files</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FileIcon size={20} />
                  <span>{file.fileName}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={file.url} download>
                      <Download size={16} className="mr-2" />
                      Download
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {images.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image.url || '/placeholder.svg'}
                    alt={image.fileName}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
