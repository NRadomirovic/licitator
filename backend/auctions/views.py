from rest_framework import generics, permissions, serializers
from .models import Bid, Auction, UserProfile
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .serializers import RegisterSerializer, AuctionSerializer, BidSerializer
from django.utils import timezone
from datetime import timedelta
from rest_framework.permissions import AllowAny


# -----------------------------
# PERMISSION CLASS
# -----------------------------

class AuctionPermission(permissions.BasePermission):

    def has_permission(self, request, view):

        # svi mogu da gledaju aukcije
        if request.method in permissions.SAFE_METHODS:
            return True

        # mora biti ulogovan
        if not request.user.is_authenticated:
            return False

        # samo USER može kreirati aukciju
        profile = request.user.userprofile

        if request.method == "POST":
            return profile.role == "user"

        return False


# -----------------------------
# LIST + CREATE AUKCIJA
# -----------------------------

class AuctionListCreateView(generics.ListCreateAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [AuctionPermission]

    def perform_create(self, serializer):

        duration = serializer.validated_data['duration_days']
        end_time = timezone.now() + timedelta(days=duration)

        serializer.save(
            owner=self.request.user,
            end_time=end_time
        )


# -----------------------------
# REGISTER
# -----------------------------

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):

        response = super().create(request, *args, **kwargs)

        user = User.objects.get(username=response.data['username'])
        token = Token.objects.get(user=user)

        return Response({
            "user": response.data,
            "token": token.key
        })


# -----------------------------
# CREATE BID
# -----------------------------

class BidCreateView(generics.CreateAPIView):

    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):

        auction = serializer.validated_data['auction']
        amount = serializer.validated_data['amount']
        user = self.request.user

        if auction.end_time <= timezone.now():
            raise serializers.ValidationError("Aukcija je završena.")

        if auction.owner == user:
            raise serializers.ValidationError("Vlasnik ne može bidovati na svoju aukciju.")

        highest_bid = auction.bids.order_by('-amount').first()

        if highest_bid:
            if amount <= highest_bid.amount:
                raise serializers.ValidationError(
                    "Ponuda mora biti veća od trenutne najviše ponude."
                )
        else:
            if amount <= auction.starting_price:
                raise serializers.ValidationError(
                    "Ponuda mora biti veća od početne cene."
                )

        serializer.save(user=user)