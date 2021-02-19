from django.shortcuts import render, reverse
from django.urls import reverse_lazy
from blog.models import Blog
from . models import Booking
from . forms import BookingForm
from django.views.generic import TemplateView,ListView,CreateView,FormView
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.contrib import messages

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

class BookingSuccess(TemplateView):
    template_name = 'pages/booking_success.html'

class BookingCreateView(CreateView):
    form_class = BookingForm
    template_name = "pages/booking.html"
    '''
    # Normal Success url
    # success_url = reverse_lazy("booking_success")
    '''

    fname = '' # full name variable declaration

    def get_context_data(self, *args, **kwargs):
        context = super(BookingCreateView, self).get_context_data(**kwargs)
        return context

    def form_valid(self, form):
        form.save()

        self.fname = form.cleaned_data.get('fname') # Assigning fname to fname varible

        subject = "Reeftours Booking"
        html_message = render_to_string("pages/booking_email.html",{
            'fname':form.cleaned_data.get('fname'),
            'phone':form.cleaned_data.get('phone'),
            'email':form.cleaned_data.get('email'),
            'trips':form.cleaned_data.get('trips'),
            'adults':form.cleaned_data.get('adults'),
            'children':form.cleaned_data.get('child'),
            'infants':form.cleaned_data.get('infant'),
            'date':form.cleaned_data.get('date'),
            'plan':form.cleaned_data.get('plan'),

        })
        message = strip_tags(html_message)
        from_email = 'info@reeftours.co.tz'

        recipient_list=['info@reeftours.co.tz']

        email = EmailMultiAlternatives(subject, message, from_email, recipient_list)
        email.attach_alternative(html_message, "text/html")
        email.send()

        return super(BookingCreateView, self).form_valid(form)

    # passing message to success url
    def get_success_url(self):
        messages.success(self.request, f'{self.fname}') # calling fname variable
        return reverse('booking_success')    

class Faq(TemplateView):
    template_name = "pages/faq.html"
