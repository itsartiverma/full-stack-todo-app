from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    # Changed 'is_completed' to 'completed' to match your model field
    list_display = ("id", "title", "completed", "created_at")
    
    list_display_links = ("id", "title")
    
    # Changed 'is_completed' to 'completed' here too
    list_filter = ("completed", "created_at")
    
    search_fields = ("title",)
