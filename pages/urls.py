from django.urls import path
from . import views
urlpatterns = [
    path('',views.Landing.as_view(), name="homepage"),
    path('transfer',views.Transer.as_view(), name="transfer"),
    path('about-us',views.About.as_view(), name="about"),
    path('contact',views.Contact.as_view(), name="contact"),
    path('groups',views.Groups.as_view(), name="groups"),
    path('booking',views.BookingCreateView.as_view(), name="booking"),
    path('before-visiting',views.Before.as_view(), name="before-visiting"),
    path('excursion/stone-town',views.StoneTown.as_view(), name="stonetown"),
    path('excursion/prison-island',views.Prison.as_view(), name="prison"),
    path('excursion/safari-blue',views.Safari.as_view(), name="safari"),
    path('excursion/johazi-forest',views.Johazi.as_view(), name="johazi"),
    path('excursion/dolphin',views.Dolphin.as_view(), name="dolphin"),
    path('excursion/spice-tour',views.Spice.as_view(), name="spice"),
    path('excursion/dhow-sunset-cruise',views.Dhow.as_view(), name="dhow"),
    path('excursion/mnemba-island',views.Mnemba.as_view(), name="mnemba"),
    path('excursion/quad-bikes',views.Quadbike.as_view(), name="quad"),
    path('excursion/fishing-game',views.Fishing.as_view(), name="fishing"),
]