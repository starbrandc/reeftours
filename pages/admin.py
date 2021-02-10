from django.contrib import admin
from . models import Booking
# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    '''Admin View for Booking'''
    list_display = ('pk','fname', 'phone', 'email', 'trips', 'date', 'created_at')
    list_filter = ('trips', 'date')
    search_fields = ('fname', 'phone', 'email')
    ordering = ('date',)