import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency

# 1. Buat Tabel Kontingensi (contoh data)
data = np.array(
    [
        [30, 20, 25, 10, 15, 10],  # SD
        [25, 15, 20, 10, 20, 10],  # SMP
        [35, 25, 30, 15, 25, 15],  # SMA
        [20, 15, 25, 10, 15, 10],  # Perguruan Tinggi
    ]
)
tabel_kontingensi = pd.DataFrame(
    data,
    columns=["Petani", "PNS", "Swasta", "Pelajar", "Wiraswasta", "Tidak Bekerja"],
    index=["SD", "SMP", "SMA", "Perguruan Tinggi"],
)
print("Tabel Kontingensi:")
print(tabel_kontingensi)

# 2. Hitung Chi-Square
chi2, p, dof, expected = chi2_contingency(data)

print("\nHasil Chi-Square Test:")
print(f"Chi-Square Value: {chi2}")
print(f"P-Value: {p}")
print(f"Degrees of Freedom: {dof}")
print("Expected Frequencies:")
print(expected)

# 3. Keputusan
alpha = 0.05
if p < alpha:
    print("\nKesimpulan: Ada hubungan antara tingkat pendidikan dan jenis pekerjaan.")
else:
    print(
        "\nKesimpulan: Tidak ada hubungan antara tingkat pendidikan dan jenis pekerjaan."
    )
