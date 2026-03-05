from django.urls import path
from .views import AuctionListCreateView, BidCreateView, RegisterView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', obtain_auth_token, name='login'),

    path('auctions/', AuctionListCreateView.as_view(), name='auction-list-create'),

    path('bids/', BidCreateView.as_view(), name='create-bid'),
]