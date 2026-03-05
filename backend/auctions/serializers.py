from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Auction, Bid


# REGISTER SERIALIZER
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        Token.objects.create(user=user)
        return user


# AUCTION SERIALIZER
class AuctionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Auction
        fields = '__all__'
        read_only_fields = ['owner', 'end_time']


# BID SERIALIZER
class BidSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bid
        fields = ['id', 'auction', 'amount', 'created_at']