import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Generate data (N=20)
np.random.seed(42)
N = 20
x1 = np.random.uniform(1, 10, N)
x2 = np.random.uniform(10, 20, N)
x3 = np.random.uniform(5, 15, N)
y = 3 + 2 * x1 + 1.5 * x2 - 0.5 * x3 + np.random.normal(0, 2, N)

# Membentuk DataFrame
data = pd.DataFrame({"y": y, "x1": x1, "x2": x2, "x3": x3})

# Regresi Linear
X = data[["x1", "x2", "x3"]]
y = data["y"]
model = LinearRegression()
model.fit(X, y)

# Koefisien dan Intersep
print("Koefisien Regresi:")
print(f"Intercept: {model.intercept_}")
print(f"x1: {model.coef_[0]}, x2: {model.coef_[1]}, x3: {model.coef_[2]}")

# Prediksi
y_pred = model.predict(X)

# Hitung MAE, MSE, RMSE
mae = mean_absolute_error(y, y_pred)
mse = mean_squared_error(y, y_pred)
rmse = np.sqrt(mse)

print("\nError Metrics:")
print(f"MAE: {mae}")
print(f"MSE: {mse}")
print(f"RMSE: {rmse}")
