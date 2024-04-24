from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.ProductView.as_view()),
    path("purchases/", views.PurchaseView.as_view()),
    path("sales/", views.SalesView.as_view()),
]