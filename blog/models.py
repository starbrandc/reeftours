from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.text import slugify
from django.urls import reverse

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=180,null=False,blank=False)
    slug = models.SlugField(blank=True, null=False, unique=True, help_text="This field will be generated automatic")
    cover = models.ImageField(upload_to="blog")
    published = models.DateTimeField(verbose_name="Published date", auto_now=True)
    content = RichTextUploadingField(null=False,blank=False)

    

    class Meta:
        verbose_name = "Blog"
        verbose_name_plural ="Blogs"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            return super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("blog:blog-detail", kwargs={"slug": self.slug})
