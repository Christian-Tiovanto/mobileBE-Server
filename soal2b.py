import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Generate data (N=25)
np.random.seed(42)
N = 25
x = np.random.uniform(1, 10, N)  # Variabel x
y = (
    5 + 2 * x - 0.3 * (x**2) + np.random.normal(0, 2, N)
)  # Persamaan kuadratik dengan noise

# Membentuk DataFrame
data_quad = pd.DataFrame({"y": y, "x": x})
data_quad["x2"] = data_quad["x"] ** 2  # Tambahkan variabel kuadrat x

# Regresi Kuadratik
X_quad = data_quad[["x", "x2"]]
y_quad = data_quad["y"]
model_quad = LinearRegression()
model_quad.fit(X_quad, y_quad)

# Koefisien Regresi Kuadratik
print("\nKoefisien Regresi Kuadratik:")
print(f"Intercept (β0): {model_quad.intercept_}")
print(f"x (β1): {model_quad.coef_[0]}")
print(f"x^2 (β2): {model_quad.coef_[1]}")

# Prediksi
y_pred_quad = model_quad.predict(X_quad)

# Hitung MAE, MSE, RMSE
mae_quad = mean_absolute_error(y_quad, y_pred_quad)
mse_quad = mean_squared_error(y_quad, y_pred_quad)
rmse_quad = np.sqrt(mse_quad)

print("\nError Metrics Kuadratik:")
print(f"MAE: {mae_quad}")
print(f"MSE: {mse_quad}")
print(f"RMSE: {rmse_quad}")
