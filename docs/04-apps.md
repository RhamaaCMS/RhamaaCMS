# Apps Guide

How to create new Wagtail apps, define Page models, and wire up React pages via Inertia.

---

## How the Existing Home App Works

The home app at `apps/home/` uses the `InertiaPageMixin` pattern:

```
apps/home/
└── models.py    # InertiaPageMixin + HomePage — points to frontend/pages/home/Index.tsx
```

```python
# apps/home/models.py
from inertia import render as inertia_render
from wagtail.models import Page


class InertiaPageMixin:
    """Mixin that serves a Wagtail Page via Inertia.js instead of an HTML template."""
    inertia_component: str = ""

    def serve(self, request):
        props = self.get_inertia_props(request)
        return inertia_render(request, self.inertia_component, props)

    def get_inertia_props(self, request) -> dict:
        return {"page_title": self.title}


class HomePage(InertiaPageMixin, Page):
    inertia_component = "home/Index"

    class Meta:
        verbose_name = "Home page"
```

The component string `"home/Index"` maps directly to `frontend/pages/home/Index.tsx`.

**There are no `.html` templates in this project** (except `layout.html` which is the Inertia root shell). Every public-facing page is a React component.

---

## 1. Create a New App

```bash
# From the project root
python manage.py startapp blog
```

Move it into the `apps/` directory to keep things tidy:

```bash
# Windows PowerShell
Move-Item blog apps\blog

# macOS / Linux
mv blog apps/blog
```

Register it in `{{ project_name }}/settings/base.py`:

```python
INSTALLED_APPS = [
    "apps.home",
    "apps.blog",   # ← add this
    # ...
]
```

---

## 2. Define Page Models

Edit `apps/blog/models.py` — use `InertiaPageMixin` and override `get_inertia_props()` to pass data to React:

```python
import json
from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from apps.home.models import InertiaPageMixin


class BlogIndexPage(InertiaPageMixin, Page):
    inertia_component = "blog/List"
    intro = models.TextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("intro")]
    subpage_types = ["blog.BlogPage"]

    def get_inertia_props(self, request) -> dict:
        posts = (
            BlogPage.objects.live()
            .descendant_of(self)
            .order_by("-date")
            .values("id", "title", "slug", "date", "intro")
        )
        return {
            "page_title": self.title,
            "intro": self.intro,
            "posts": list(posts),
        }


class BlogPage(InertiaPageMixin, Page):
    inertia_component = "blog/Detail"
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField()

    content_panels = Page.content_panels + [
        FieldPanel("date"),
        FieldPanel("intro"),
        FieldPanel("body"),
    ]
    parent_page_types = ["blog.BlogIndexPage"]

    def get_inertia_props(self, request) -> dict:
        from wagtail.rich_text import expand_db_html
        return {
            "page_title": self.title,
            "date": str(self.date),
            "intro": self.intro,
            "body_html": expand_db_html(self.body),   # safe HTML for dangerouslySetInnerHTML
        }
```

---

## 3. Run Migrations

```bash
python manage.py makemigrations blog
python manage.py migrate
```

---

## 4. Create React Page Components

```tsx
// frontend/pages/blog/List.tsx
import RootLayout from "@/layouts/RootLayout";
import { Head } from "@inertiajs/react";

interface Post { id: number; title: string; slug: string; date: string; intro: string; }
interface Props { page_title: string; intro: string; posts: Post[]; }

export default function BlogList({ page_title, intro, posts }: Props) {
  return (
    <RootLayout>
      <Head title={page_title} />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="font-display text-5xl font-semibold text-white mb-4">{page_title}</h1>
        {intro && <p className="text-white/60 text-lg mb-10">{intro}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}/`}
              className="group flex flex-col gap-2 rounded-2xl border border-white/10
                         bg-white/[0.06] p-6 hover:border-gold-500/35 hover:-translate-y-1
                         transition-all duration-200"
            >
              <p className="font-mono text-gold-400 text-[11px] tracking-widest uppercase">
                {post.date}
              </p>
              <h2 className="font-display text-xl font-semibold text-white">{post.title}</h2>
              <p className="text-white/50 text-sm leading-relaxed">{post.intro}</p>
            </a>
          ))}
        </div>
      </main>
    </RootLayout>
  );
}
```

```tsx
// frontend/pages/blog/Detail.tsx
import RootLayout from "@/layouts/RootLayout";
import { Head } from "@inertiajs/react";

interface Props {
  page_title: string; date: string; intro: string; body_html: string;
}

export default function BlogDetail({ page_title, date, intro, body_html }: Props) {
  return (
    <RootLayout>
      <Head title={page_title} />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <p className="font-mono text-gold-400 text-[11px] tracking-widest uppercase mb-4">{date}</p>
        <h1 className="font-display text-5xl font-semibold text-white mb-4">{page_title}</h1>
        <p className="text-white/60 text-lg mb-8">{intro}</p>
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: body_html }}
        />
      </article>
    </RootLayout>
  );
}
```

---

## 5. Add Pages in Wagtail Admin

1. Open `/admin/` → **Pages**
2. Navigate to root → **Add child page** → `Blog Index Page` → publish
3. Inside that page → **Add child page** → `Blog Page` → fill in fields → publish

---

## App Structure Reference

```
apps/blog/
├── __init__.py
├── models.py           # InertiaPageMixin + BlogIndexPage + BlogPage
├── migrations/         # Auto-generated by makemigrations
└── apps.py

frontend/pages/blog/
├── List.tsx            # BlogIndexPage → lists all posts
└── Detail.tsx          # BlogPage → single post view
```

---

## Passing Complex Data (StreamField)

For StreamField content, serialize each block in `get_inertia_props()` and render in React:

```python
# apps/blog/models.py
from wagtail.fields import StreamField
from wagtail.blocks import CharBlock, RichTextBlock, ImageChooserBlock
from wagtail.images.shortcuts import get_rendition_or_not_found

class ArticlePage(InertiaPageMixin, Page):
    inertia_component = "blog/Article"
    body = StreamField([
        ("heading",   CharBlock()),
        ("paragraph", RichTextBlock()),
        ("image",     ImageChooserBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [FieldPanel("body")]

    def get_inertia_props(self, request) -> dict:
        from wagtail.rich_text import expand_db_html
        blocks = []
        for block in self.body:
            if block.block_type == "heading":
                blocks.append({"type": "heading", "value": str(block.value)})
            elif block.block_type == "paragraph":
                blocks.append({"type": "paragraph", "value": expand_db_html(str(block.value))})
            elif block.block_type == "image":
                img = block.value
                rendition = get_rendition_or_not_found(img, "width-1200")
                blocks.append({"type": "image", "url": rendition.url, "alt": img.title})
        return {"page_title": self.title, "blocks": blocks}
```

```tsx
// frontend/pages/blog/Article.tsx
interface Block {
  type: "heading" | "paragraph" | "image";
  value?: string; url?: string; alt?: string;
}

export default function Article({ page_title, blocks }: { page_title: string; blocks: Block[] }) {
  return (
    <RootLayout>
      <Head title={page_title} />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-5xl font-semibold text-white mb-8">{page_title}</h1>
        {blocks.map((block, i) => {
          if (block.type === "heading")
            return <h2 key={i} className="font-display text-2xl text-white mt-10 mb-4">{block.value}</h2>;
          if (block.type === "paragraph")
            return <div key={i} className="prose prose-invert mb-6"
                        dangerouslySetInnerHTML={{ __html: block.value! }} />;
          if (block.type === "image")
            return <img key={i} src={block.url} alt={block.alt} className="rounded-2xl w-full mb-6" />;
        })}
      </article>
    </RootLayout>
  );
}
```

---

## Shared Props (Available on Every Page)

To inject data into every page's props automatically (e.g. logged-in user, flash messages, site config), use Inertia's `INERTIA_SHARE` setting or a custom middleware:

```python
# {{ project_name }}/middleware.py
from inertia import share

class InertiaShareMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        share(request, site_name="RhamaaCMS")
        if request.user.is_authenticated:
            share(request, auth={"username": request.user.username})
        return self.get_response(request)
```

Add to `MIDDLEWARE` in `settings/base.py`:
```python
"{{ project_name }}.middleware.InertiaShareMiddleware",
```

Access in any React component:
```tsx
import { usePage } from "@inertiajs/react";

const { site_name, auth } = usePage().props;
```

---

## Wagtail Snippets

Snippets are reusable non-page content (testimonials, nav items, team members). They're managed in Wagtail admin but queried in `get_inertia_props()`:

```python
from wagtail.snippets.models import register_snippet

@register_snippet
class Announcement(models.Model):
    text = models.TextField()
    active = models.BooleanField(default=True)

    panels = [FieldPanel("text"), FieldPanel("active")]

    def __str__(self):
        return self.text[:60]
```

Then in any page's `get_inertia_props()`:
```python
def get_inertia_props(self, request) -> dict:
    return {
        "page_title": self.title,
        "announcements": list(
            Announcement.objects.filter(active=True).values("text")
        ),
    }
```
