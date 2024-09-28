# Gerekli kütüphaneleri içe aktar
import pandas as pd  # Veri işleme ve analiz için
import matplotlib.pyplot as plt  # Veri görselleştirme için
import numpy as np  # Sayısal işlemler için
import seaborn as sns  # Veri görselleştirme için
from sklearn.model_selection import train_test_split  # Veri kümesini eğitim ve test setlerine ayırmak için
from sklearn.metrics import accuracy_score, classification_report  # Model performansını değerlendirmek için
from sklearn.preprocessing import MinMaxScaler  # Özellikleri ölçeklendirmek için
from sklearn.tree import DecisionTreeClassifier  # Karar ağacı sınıflandırıcı
from sklearn.feature_selection import mutual_info_classif  # Özellik seçimi için karşılıklı bilgi
from imblearn.over_sampling import SMOTE  # Aşırı örnekleme için SMOTE
from imblearn.under_sampling import RandomUnderSampler  # Azaltma için RandomUnderSampler
from sklearn.naive_bayes import GaussianNB  # Naive Bayes sınıflandırıcı
from sklearn.neural_network import MLPClassifier  # Yapay Sinir Ağı (ANN) sınıflandırıcı

# Excel dosyasının yolunu belirtin
excelDosyasiYolu = 'C:/Users/zzehr/Desktop/defaultOfCreditCardClients.xls'

# Excel dosyasını okuyun (varsayılan olarak ilk sayfayı okur)
veri = pd.read_excel(excelDosyasiYolu)  # Excel dosyasını oku
veri = veri.drop(index=veri.index[0]).reset_index(drop=True)  # İlk satırı başlık satırı olarak kabul etmeme ve indeksi sıfırlama

# Boş değerlerin olup olmadığını kontrol et
print(veri.isnull().sum())  # Her sütundaki boş değerlerin sayısını yazdır

# Özellikler (X) ve hedef değişkenler (y) olarak veriyi ayır
X = veri.drop('Y', axis=1)  # Hedef değişken olan 'Y' hariç tüm sütunları özellikler olarak ayır
y = veri['Y']  # 'Y' sütununu hedef değişken olarak ayır

# Özellikleri ölçeklendir
scaler = MinMaxScaler()  # Özelliklerin değerlerini 0 ile 1 arasında ölçeklendirmek için scaler oluştur
X_scaled = scaler.fit_transform(X)  # Özellikleri ölçeklendir

# Veriyi eğitim ve test setlerine ayır (%80 eğitim, %20 test)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.20, random_state=42)  # Eğitim ve test setlerine ayır

# SMOTE ile aşırı örnekleme yap
smote = SMOTE(random_state=42)  # SMOTE örnekleyici oluştur
X_resampled, y_resampled = smote.fit_resample(X_train, y_train)  # Eğitim setinde SMOTE uygulayarak dengeli bir veri seti oluştur

# Özelliklerin karşılıklı bilgi değerlerini hesapla
mutual_info = mutual_info_classif(X_resampled, y_resampled)  # Özelliklerin hedef değişken ile karşılıklı bilgilerini hesapla
feature_names = X.columns  # Özellik isimlerini al
mi_df = pd.DataFrame({'Feature': feature_names, 'Mutual Information': mutual_info})  # Özellikler ve karşılıklı bilgi değerlerini içeren bir DataFrame oluştur

# Özellikleri karşılıklı bilgiye göre sıralayarak yazdır
print(mi_df.sort_values(by='Mutual Information', ascending=False))  # Özellikleri karşılıklı bilgiye göre sıralayarak yazdır


print("***********************************************************************************************************************")

# Decision Tree sınıflandırıcıyı Gini indexine göre tanımla
decision_tree_gini = DecisionTreeClassifier(criterion='gini', random_state=42)

# Karar ağacı modelini eğitim verileri ile eğit
decision_tree_gini.fit(X_resampled, y_resampled)

# Test setinde modelin tahminlerini yap
y_pred = decision_tree_gini.predict(X_test)

# Modelin doğruluk skorunu hesapla ve yazdır
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Doğruluk Skoru: {accuracy:.4f}")

# Sınıflandırma raporunu yazdır
print("\nSınıflandırma Raporu:")
print(classification_report(y_test, y_pred))


print("***********************************************************************************************************************")

# Naive Bayes sınıflandırıcıyı tanımla
naive_bayes = GaussianNB()

# Naive Bayes modelini eğitim verileri ile eğit
naive_bayes.fit(X_resampled, y_resampled)

# Test setinde modelin tahminlerini yap
y_pred_nb = naive_bayes.predict(X_test)

# Naive Bayes modelinin doğruluk skorunu hesapla ve yazdır
accuracy_nb = accuracy_score(y_test, y_pred_nb)
print(f"Naive Bayes Model Doğruluk Skoru: {accuracy_nb:.4f}")

# Naive Bayes sınıflandırma raporunu yazdır
print("\nNaive Bayes Sınıflandırma Raporu:")
print(classification_report(y_test, y_pred_nb))

print("***********************************************************************************************************************")

# Yapay Sinir Ağı (ANN) sınıflandırıcıyı tanımla
ann = MLPClassifier(hidden_layer_sizes=(10,), activation='relu', solver='adam', random_state=42)

# Yapay Sinir Ağı modelini eğitim verileri ile eğit
ann.fit(X_resampled, y_resampled)

# Test setinde modelin tahminlerini yap
y_pred_ann = ann.predict(X_test)

# Yapay Sinir Ağı modelinin doğruluk skorunu hesapla ve yazdır
accuracy_ann = accuracy_score(y_test, y_pred_ann)
print(f"Yapay Sinir Ağı Model Doğruluk Skoru: {accuracy_ann:.4f}")

# Yapay Sinir Ağı sınıflandırma raporunu yazdır
print("\nYapay Sinir Ağı Sınıflandırma Raporu:")
print(classification_report(y_test, y_pred_ann))

print("***********************************************************************************************************************")
# İki gizli katmanlı Yapay Sinir Ağı (ANN) sınıflandırıcıyı tanımla
ann_double = MLPClassifier(hidden_layer_sizes=(10, 5), activation='relu', solver='adam', random_state=42)

# İki gizli katmanlı Yapay Sinir Ağı modelini eğitim verileri ile eğit
ann_double.fit(X_resampled, y_resampled)

# Test setinde modelin tahminlerini yap
y_pred_ann_double = ann_double.predict(X_test)

# İki gizli katmanlı Yapay Sinir Ağı modelinin doğruluk skorunu hesapla ve yazdır
accuracy_ann_double = accuracy_score(y_test, y_pred_ann_double)
print(f"İki Gizli Katmanlı Yapay Sinir Ağı Model Doğruluk Skoru: {accuracy_ann_double:.4f}")

# İki gizli katmanlı Yapay Sinir Ağı sınıflandırma raporunu yazdır
print("\nİki Gizli Katmanlı Yapay Sinir Ağı Sınıflandırma Raporu:")
print(classification_report(y_test, y_pred_ann_double))