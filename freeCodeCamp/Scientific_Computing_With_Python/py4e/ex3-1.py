hours = input("Enter Hours: ")
float_hours = float(hours)
rate = input("Enter Rate: ")
float_rate= float(rate)
# print(floathours, floatrate)

if float_hours > 40:
    print("Overtime")
    regular_pay = float_hours * float_rate
    overtime_pay = (float_hours - 40.0) * (float_rate * 1.5)
    print(regular_pay, overtime_pay)
    pay = regular_pay + overtime_pay
else:
    print("Regular")
    pay = float_hours * float_rate

print("Your pay is:", pay)
