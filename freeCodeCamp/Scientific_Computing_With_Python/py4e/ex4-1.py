def computepay(hours, rate):
    #print("In computepay", hours, rate)
    if hours > 40:
        regular_pay = hours * rate
        overtime_pay = (hours - 40.0) * (rate * 1.5)
        pay = regular_pay + overtime_pay
    else:
        pay = hours * rate
    #print("Returning", pay)
    return(pay)

hours = input("Enter Hours: ")
float_hours = float(hours)
rate = input("Enter Rate: ")
float_rate= float(rate)
xp = computepay(float_hours, float_rate)

print("Your pay is:", xp)
