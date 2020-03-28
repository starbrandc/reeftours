from django.shortcuts import render
from . models import Blog
from django.views.generic import ListView, DetailView
# Create your views here.

class BlogListView(ListView):
    model = Blog
    context_object_name = "blog"
    template_name = "blog/list.html"


class BlogDetailView(DetailView):
    model = Blog
    context_object_name = "detail"
    template_name = "blog/detail.html"
