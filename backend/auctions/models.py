from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from datetime import timedelta
from django.db.models.signals import post_save
from django.dispatch import receiver


class Auction(models.Model):

    CATEGORY_CHOICES = [
        ('electronics', 'Elektronika'),
        ('fashion', 'Moda'),
        ('collectibles', 'Kolekcionarstvo'),
        ('books', 'Knjige'),
        ('other', 'Ostalo'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()

    starting_price = models.PositiveIntegerField(
        validators=[MinValueValidator(10)]
    )

    duration_days = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='other'
    )

    image = models.ImageField(
        upload_to='auction_images/',
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField()

    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def current_price(self):
        highest_bid = self.bids.order_by('-amount').first()
        if highest_bid:
            return highest_bid.amount
        return self.starting_price

    def __str__(self):
        return self.title


class Bid(models.Model):

    auction = models.ForeignKey(
        Auction,
        on_delete=models.CASCADE,
        related_name='bids'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    amount = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount}"

    def clean(self):

        if self.auction.owner == self.user:
            raise ValidationError("Ne možete licitirati svoju aukciju.")

        if self.auction.end_time <= timezone.now():
            raise ValidationError("Aukcija je završena.")

        if self.amount <= self.auction.current_price:
            raise ValidationError("Ponuda mora biti veća od trenutne cene.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


# ------------------------------
# USER ROLE SYSTEM
# ------------------------------

class UserProfile(models.Model):

    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
        ('superadmin', 'SuperAdmin'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.user.username} - {self.role}"


# automatski kreira profil kad se korisnik registruje
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()