from django import forms
import datetime
from . models import Booking

class BookingForm(forms.ModelForm):
    TRIPS = [
        ('stone','Stone Town'),
        ('prison','Prison Island'),
        ('safari','Safari Blue'),
        ('johazi','Johazi Forest'),
        ('dolphin','Dolphin Tour'),
        ('spice','Spice Tour'),
        ('dhow','Dhow Sunset Cruise'),
        ('mnemba','Mnemba Island'),
        ('Fishing Trip','Fishing Trip'),
        ('quad bikes','Quad Bikes')
    ]
    fname = forms.CharField(max_length=100,label="Enter Your Full Name")
    phone = forms.CharField(max_length=100, label="Enter Your Phone Number",help_text="Start with country code eg:+255")
    email = forms.EmailField(label="Enter Your E-mail")
    trips = forms.ChoiceField(choices=TRIPS,label="Select Your Prefered Destination")
    date = forms.DateField(initial=datetime.date.today,label="Arrival Date",widget=forms.TextInput(attrs={'class':'selected-date','type':'date','id':'datepicker'}))
    adults = forms.IntegerField(label="Number of Adults",help_text="Above 11 Years", widget=forms.NumberInput(attrs={'min':'0'}))
    child = forms.IntegerField(label="Number of Children",help_text="Age of 2 to 11 Years", widget=forms.NumberInput(attrs={'min':'0'}))
    infant = forms.IntegerField(label="Number of Infants",help_text="Under 2 Years", widget=forms.NumberInput(attrs={'min':'0'}))
    plan = forms.CharField(widget=forms.Textarea,label="Tell Us About Your Plan")

    class Meta:
        model = Booking
        fields = '__all__'