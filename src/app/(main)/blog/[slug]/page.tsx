
"use client"; 
import { placeholderBlogPosts } from '@/lib/placeholder-data';
import Image from 'next/image';
import { CalendarDays, UserCircle, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types';

// Removed generateStaticParams as posts are now dynamic

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Find post from the (potentially mutated) placeholderBlogPosts
      const foundPost = placeholderBlogPosts.find((p) => p.slug === slug);
      setPost(foundPost);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto py-12 text-center">Loading post...</div>;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 text-center">
        <h1 className="font-headline text-3xl text-destructive mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist or may have been moved.</p>
        <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Button>
          <h1 className="font-headline text-4xl font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Published on {new Date(post.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><UserCircle className="h-5 w-5" /> By {post.author}</span>
          </div>
        </div>

        <div className="relative h-72 w-full md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill // Changed from layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
            style={{objectFit:"cover"}} // Replaced objectFit="cover"
            data-ai-hint={post.dataAiHint || 'blog article detail'}
          />
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
