import { placeholderBlogPosts } from '@/lib/placeholder-data';
import Image from 'next/image';
import { CalendarDays, UserCircle, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return placeholderBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = placeholderBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div className="container mx-auto py-12 text-center">Post not found.</div>;
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
            layout="fill" 
            objectFit="cover"
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
