from django.db import models

# Create your models here.
class Booking(models.Model):
    TRIPS = [
        ('stone','Stone Town'),
        ('prison','Prison Island'),
        ('safari','Safari Blue'),
        ('johazi','Johazi Forest'),
        ('dolphin','Dolphin Tour'),
        ('spice','Spice Tour'),
        ('dhow','Dhow Sunset Cruise'),
        ('mnemba','Mnemba Island')
    ]
    fname = models.CharField(verbose_name="First Name", max_length=100)
    lname = models.CharField(verbose_name="Last Name", max_length=100)
    phone = models.CharField(verbose_name="Phone Number", max_length=100, help_text="Start with country code eg:+255")
    trips = models.CharField(verbose_name="SELECT ACTIVITY", max_length=15,choices=TRIPS)
    adults = models.IntegerField(verbose_name="Adults")
    child = models.IntegerField(verbose_name="Child")
    date = models.DateField(verbose_name="ARRIVAL DATE", auto_now=False, auto_now_add=False)
    infant = models.IntegerField(verbose_name="infants")
    plan = models.TextField(verbose_name="TELL US ABOUT YOUR PLAN")

    class Meta:
        """Meta definition for Booking."""

        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'

    def __str__(self):
        """Unicode representation of Booking."""
        return self.fname

    def save(self):
        """Save method for Booking."""
        pass

    def get_absolute_url(self):
        """Return absolute url for Booking."""
        return ('')

    # TODO: Define custom methods here
