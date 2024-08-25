#serialization is the process of converting a data structure or object state into a 
#format that can be store or transmitted. 
#

from rest_framework import serializers

class RoomSerializer(serializers.ModelSerializer):
    class Meta: