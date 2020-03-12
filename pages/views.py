from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.
class Landing(TemplateView):
    template_name = 'pages/index.html'

class About(TemplateView):
    template_name = 'pages/about.html'

class Contact(TemplateView):
    template_name = 'pages/contact.html'

class StoneTown(TemplateView):
    template_name = 'excursion/stone.html'

class Prison(TemplateView):
    template_name = 'excursion/prison.html'

class Safari(TemplateView):
    template_name = 'excursion/safari.html'

class Johazi(TemplateView):
    template_name = 'excursion/johazi.html'

class Dolphin(TemplateView):
    template_name = 'excursion/dolphin.html'

class Spice(TemplateView):
    template_name = 'excursion/spice.html'

class Dhow(TemplateView):
    template_name = 'excursion/dhow.html'

class Mnemba(TemplateView):
    template_name = 'excursion/mnemba.html'

class Transer(TemplateView):
    template_name = 'pages/transfer.html'