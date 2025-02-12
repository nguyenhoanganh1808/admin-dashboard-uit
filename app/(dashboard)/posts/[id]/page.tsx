import PostDetail from '@/app/(dashboard)/posts/[id]/post-detail';
import apiServer from '@/services/api-server';

// This is mock data. In a real application, you would fetch this data from your API
const mockPost = {
  id: '1',
  content:
    'This is a sample post content.\n\nIt demonstrates how the content, including line breaks, would be displayed in the post detail view.',
  topics: ['Technology', 'Science'],
  files: [
    { name: 'document.pdf', url: '/path/to/document.pdf' },
    { name: 'spreadsheet.xlsx', url: '/path/to/spreadsheet.xlsx' }
  ],
  images: [
    { url: '/placeholder.svg?height=300&width=300', alt: 'Sample image 1' },
    { url: '/placeholder.svg?height=300&width=300', alt: 'Sample image 2' },
    { url: '/placeholder.svg?height=300&width=300', alt: 'Sample image 3' },
    { url: '/placeholder.svg?height=300&width=300', alt: 'Sample image 4' }
  ]
};

interface MediaFile {
  fileName: string;
  type: string;
  size: number;
  url: string;
}

export default async function PostDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  // In a real application, you would fetch the post data here based on the id
  const { id: postId } = await params;
  const { data } = await apiServer.get(`/posts/${postId}`);
  const post = data.body;
  console.log('POST: ', post);

  const formatPost = {
    content: post.textContent,
    topics: post.topics,
    files: post.mediaFiles.filter(
      (file: MediaFile) => file.type !== 'IMAGE' && file.type !== 'VIDEO'
    ),
    images: post.mediaFiles.filter((file: MediaFile) => file.type === 'IMAGE')
  };

  return (
    <div className="">
      <PostDetail {...formatPost} />{' '}
    </div>
  );
}
