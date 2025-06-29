/*  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';



import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
 

  url: string | null = null;

 blogPost$: Observable<BlogPost> = of(); // Initialize with empty observable
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,

 
  ) {
   
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
      },
    });

    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}

 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$: Observable<BlogPost> = of();
  currentUrl: string = '';
  showCopiedMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    
    this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('url');
      },
    });

    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }

  shareOnFacebook(): void {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
    this.openShareWindow(shareUrl);
  }

  shareOnTwitter(): void {
    this.blogPost$.subscribe(blogPost => {
      const text = `Check out this article: ${blogPost.title}`;
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.currentUrl)}`;
      this.openShareWindow(shareUrl);
    });
  }

  copyArticleLink(): void {
    navigator.clipboard.writeText(this.currentUrl)
      .then(() => {
        this.showCopiedMessage = true;
        setTimeout(() => this.showCopiedMessage = false, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = this.currentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.showCopiedMessage = true;
        setTimeout(() => this.showCopiedMessage = false, 2000);
      });
  }

  private openShareWindow(url: string): void {
    window.open(url, '_blank', 'width=600,height=400,left=100,top=100');
  }
}