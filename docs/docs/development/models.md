# Models and Content Types

Learn how to create and customize page models in the Wagtail News Template. The template provides a powerful base model system that handles SEO, performance, and common functionality.

## Base Model Architecture

### BasePage Model

All page models inherit from `BasePage`, which provides:

- **SEO Optimization**: Complete meta tags, Open Graph, Twitter Cards
- **Listing Fields**: Image, title, and summary for page previews
- **Related Pages**: Ability to link related content
- **Performance**: Optimized queries and caching
- **Search Control**: Visibility settings for search engines

```python
from utils.models import BasePage
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel

class ArticlePage(BasePage):
    body = RichTextField()
    
    content_panels = BasePage.content_panels + [
        FieldPanel('body'),
    ]
```

## Creating Custom Page Types

### Simple Content Page

```python
# apps/home/models.py
from django.db import models
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from utils.models import BasePage

class ContentPage(BasePage):
    """
    A simple content page with rich text body.
    """
    introduction = models.TextField(
        max_length=500,
        blank=True,
        help_text="Introduction text for the page"
    )
    body = RichTextField(blank=True)
    
    content_panels = BasePage.content_panels + [
        FieldPanel('introduction'),
        FieldPanel('body'),
    ]
    
    class Meta:
        verbose_name = "Content Page"
        verbose_name_plural = "Content Pages"
```

### News Article Page

```python
from django.db import models
from wagtail.fields import RichTextField, StreamField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.images import get_image_model_string
from utils.models import BasePage
from utils.blocks import LinkStreamBlock

class NewsArticlePage(BasePage):
    """
    News article page with author, date, and rich content.
    """
    author = models.CharField(max_length=255, blank=True)
    date = models.DateField("Publication date")
    featured_image = models.ForeignKey(
        get_image_model_string(),
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    introduction = models.TextField(
        max_length=500,
        help_text="Brief introduction to the article"
    )
    body = RichTextField()
    
    # Related links
    related_links = StreamField([
        ('link', LinkStreamBlock()),
    ], blank=True, use_json_field=True)
    
    content_panels = BasePage.content_panels + [
        MultiFieldPanel([
            FieldPanel('author'),
            FieldPanel('date'),
            FieldPanel('featured_image'),
        ], heading="Article Details"),
        FieldPanel('introduction'),
        FieldPanel('body'),
        FieldPanel('related_links'),
    ]
    
    class Meta:
        verbose_name = "News Article"
        verbose_name_plural = "News Articles"
    
    def get_context(self, request):
        context = super().get_context(request)
        # Add custom context variables
        context['recent_articles'] = NewsArticlePage.objects.live().public().order_by('-date')[:5]
        return context
```

### Landing Page with Blocks

```python
from wagtail.fields import StreamField
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from utils.models import BasePage

class LandingPage(BasePage):
    """
    Flexible landing page using StreamField blocks.
    """
    
    # Define custom blocks
    class HeroBlock(blocks.StructBlock):
        title = blocks.CharBlock(max_length=200)
        subtitle = blocks.TextBlock(max_length=500, required=False)
        image = ImageChooserBlock()
        cta_text = blocks.CharBlock(max_length=50, required=False)
        cta_link = blocks.PageChooserBlock(required=False)
        
        class Meta:
            icon = 'image'
            template = 'blocks/hero_block.html'
    
    class FeatureBlock(blocks.StructBlock):
        title = blocks.CharBlock(max_length=200)
        description = blocks.TextBlock()
        icon = blocks.CharBlock(max_length=50, help_text="Font Awesome icon class")
        
        class Meta:
            icon = 'pick'
            template = 'blocks/feature_block.html'
    
    # StreamField with custom blocks
    content = StreamField([
        ('hero', HeroBlock()),
        ('features', blocks.ListBlock(FeatureBlock())),
        ('rich_text', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ], use_json_field=True)
    
    content_panels = BasePage.content_panels + [
        FieldPanel('content'),
    ]
    
    class Meta:
        verbose_name = "Landing Page"
```

## Advanced Model Features

### Custom Managers and QuerySets

```python
from django.db import models
from django.utils import timezone

class ArticleQuerySet(models.QuerySet):
    def published(self):
        return self.filter(date__lte=timezone.now().date())
    
    def featured(self):
        return self.filter(featured=True)
    
    def by_author(self, author):
        return self.filter(author__icontains=author)

class ArticleManager(models.Manager):
    def get_queryset(self):
        return ArticleQuerySet(self.model, using=self._db)
    
    def published(self):
        return self.get_queryset().published()
    
    def featured(self):
        return self.get_queryset().featured()

class NewsArticlePage(BasePage):
    # ... fields ...
    
    objects = ArticleManager()
    
    def save(self, *args, **kwargs):
        # Custom save logic
        if not self.date:
            self.date = timezone.now().date()
        super().save(*args, **kwargs)
```

### Model with Categories

```python
from django.db import models
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from wagtail.models import Orderable
from wagtail.snippets.models import register_snippet

@register_snippet
class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    
    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
        FieldPanel('description'),
    ]
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'categories'

class NewsArticlePage(BasePage):
    # ... other fields ...
    
    categories = ParentalManyToManyField('Category', blank=True)
    
    content_panels = BasePage.content_panels + [
        # ... other panels ...
        FieldPanel('categories', widget=forms.CheckboxSelectMultiple),
    ]
```

### Model with Tags

```python
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase

class NewsArticlePageTag(TaggedItemBase):
    content_object = ParentalKey(
        'NewsArticlePage',
        related_name='tagged_items',
        on_delete=models.CASCADE
    )

class NewsArticlePage(BasePage):
    # ... other fields ...
    
    tags = ClusterTaggableManager(through=NewsArticlePageTag, blank=True)
    
    content_panels = BasePage.content_panels + [
        # ... other panels ...
        FieldPanel('tags'),
    ]
```

## Model Best Practices

### 1. Use BasePage Inheritance

Always inherit from `BasePage` to get SEO and performance benefits:

```python
# Good
class MyPage(BasePage):
    pass

# Avoid
class MyPage(Page):
    pass
```

### 2. Optimize Database Queries

Use `select_related` and `prefetch_related`:

```python
def get_context(self, request):
    context = super().get_context(request)
    context['articles'] = NewsArticlePage.objects.live().public().select_related('owner').prefetch_related('categories')
    return context
```

### 3. Use Appropriate Field Types

Choose the right field for your data:

```python
class EventPage(BasePage):
    # Use DateTimeField for events with specific times
    start_datetime = models.DateTimeField()
    
    # Use DateField for all-day events
    event_date = models.DateField()
    
    # Use TextField for longer content
    description = models.TextField()
    
    # Use CharField with max_length for shorter content
    location = models.CharField(max_length=255)
    
    # Use DecimalField for prices
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
```

### 4. Add Helpful Methods

```python
class NewsArticlePage(BasePage):
    date = models.DateField()
    
    @property
    def is_recent(self):
        """Check if article was published in the last 30 days."""
        from datetime import timedelta
        return self.date >= timezone.now().date() - timedelta(days=30)
    
    def get_absolute_url(self):
        """Get the full URL for this page."""
        return self.full_url
    
    def get_reading_time(self):
        """Estimate reading time based on word count."""
        word_count = len(self.body.split())
        return max(1, word_count // 200)  # Assume 200 words per minute
```

## Model Validation

### Custom Validation

```python
from django.core.exceptions import ValidationError

class EventPage(BasePage):
    start_date = models.DateField()
    end_date = models.DateField()
    
    def clean(self):
        super().clean()
        if self.start_date and self.end_date:
            if self.start_date > self.end_date:
                raise ValidationError({
                    'end_date': 'End date must be after start date.'
                })
```

## Testing Models

### Model Tests

```python
# tests/test_models.py
from django.test import TestCase
from django.utils import timezone
from apps.home.models import NewsArticlePage

class NewsArticlePageTest(TestCase):
    def setUp(self):
        self.home_page = HomePage.objects.get(slug='home')
        
    def test_article_creation(self):
        article = NewsArticlePage(
            title="Test Article",
            slug="test-article",
            author="Test Author",
            date=timezone.now().date(),
            body="<p>Test content</p>"
        )
        self.home_page.add_child(instance=article)
        article.save_revision().publish()
        
        self.assertTrue(article.live)
        self.assertEqual(article.title, "Test Article")
    
    def test_is_recent_property(self):
        # Test recent article
        recent_article = NewsArticlePage(
            title="Recent Article",
            date=timezone.now().date()
        )
        self.assertTrue(recent_article.is_recent)
        
        # Test old article
        old_article = NewsArticlePage(
            title="Old Article",
            date=timezone.now().date() - timezone.timedelta(days=60)
        )
        self.assertFalse(old_article.is_recent)
```

## Next Steps

- [Learn about StreamField blocks](blocks.md)
- [Customize templates](templates.md)
- [Explore the admin interface](../api/models.md)