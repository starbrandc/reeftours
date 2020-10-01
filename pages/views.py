from django.shortcuts import render
from blog.models import Blog
from . models import Booking
from . forms import BookingForm
from django.views.generic import TemplateView,ListView,CreateView,FormView
from django.core.mail import send_mail

# Create your views here.
class Landing(ListView):
    model = Blog
    context_object_name = "blog"
    paginate_by = 3
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

class Groups(TemplateView):
    template_name = 'pages/groups.html'

class Before(TemplateView):
    template_name = 'pages/before.html'

class Quadbike(TemplateView):
    template_name = 'excursion/quad.html'

class Fishing(TemplateView):
    template_name = 'excursion/fishing.html'


class BookingCreateView(FormView):
    model = Booking
    form_class = BookingForm
    template_name = "pages/booking.html"
    success_url = '/booking/'

    def form_valid(self, form):
        message = "{name} / {email} said: ".format(
            name=form.cleaned_data.get('name'),
            email=form.cleaned_data.get('email'))
        message += "\n\n{0}".format(form.cleaned_data.get('message'))
        send_mail(
            subject=form.cleaned_data.get('subject').strip(),
            message=message,
            from_email='contact-form@myapp.com',
            recipient_list=[],
        )
        return super(BookingCreateView, self).form_valid(form)

class Faq(TemplateView):
    template_name = "pages/faq.html"
