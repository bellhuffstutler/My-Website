hours = input("Enter Hours: ")
rate = input("Enter Rate: ")
try:
    float_hours = float(hours)
    float_rate = float(rate)
except:
    print("Enter a numeric value!")
    quit()

if float_hours > 40:
    regular_pay = float_hours * float_rate
    overtime_pay = (float_hours - 40.0) * (float_rate * 1.5)
    pay = regular_pay + overtime_pay
else:
    pay = float_hours * float_rate

print("Your pay is:", pay)
