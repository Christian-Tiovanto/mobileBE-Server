import numpy as np
import pandas as pd

# Set jumlah pasangan (N >= 25)
N = 25

# Generate N data untuk x1, x2, x3, x4
np.random.seed(42)  # Untuk hasil yang konsisten
x1 = np.random.normal(loc=0, scale=1, size=N)
x2 = np.random.normal(loc=5, scale=2, size=N)
x3 = np.random.normal(loc=10, scale=3, size=N)
x4 = np.random.normal(loc=20, scale=4, size=N)

# Masukkan data ke dalam DataFrame
data = pd.DataFrame({"x1": x1, "x2": x2, "x3": x3, "x4": x4})

# Hitung korelasi antar variabel
correlation_matrix = data.corr()

# Hitung kovarians antar variabel
covariance_matrix = data.cov()

# Tampilkan hasil
print("Data (N=25):")
print(data)
print("\nMatriks Korelasi:")
print(correlation_matrix)
print("\nMatriks Kovarians:")
print(covariance_matrix)


# Hitung korelasi secara manual menggunakan kovarians dan simpangan baku
def compute_correlation_from_covariance(data, var1, var2):
    covariance = data[[var1, var2]].cov().iloc[0, 1]  # Ambil nilai kovarians
    std_x = data[var1].std()  # Simpangan baku var1
    std_y = data[var2].std()  # Simpangan baku var2
    correlation = covariance / (std_x * std_y)  # Hitung korelasi
    return correlation


# Variabel pasangan yang akan dihitung
variable_pairs = [
    ("x1", "x2"),
    ("x1", "x3"),
    ("x1", "x4"),
    ("x2", "x3"),
    ("x2", "x4"),
    ("x3", "x4"),
]

# Hitung korelasi dan kovarians untuk setiap pasangan
results = []
for var1, var2 in variable_pairs:
    covariance = data[[var1, var2]].cov().iloc[0, 1]
    correlation = compute_correlation_from_covariance(data, var1, var2)
    results.append((var1, var2, covariance, correlation))

# Tampilkan hasil
print("Hubungan antara Kovarians dan Korelasi:")
print("Var1  Var2  Covariance   Correlation")
for var1, var2, cov, corr in results:
    print(f"{var1:<4}  {var2:<4}  {cov:<12.6f}  {corr:<12.6f}")

# Validasi dengan matriks korelasi langsung
print("\nValidasi dengan Matriks Korelasi:")
print(data.corr())
