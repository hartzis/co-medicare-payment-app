import csv
import collections
# data = csv.DictReader(open('testArvada.csv'))

# # creates a dictionary with specialties as keys, and lists of the payments as values
# listOfSpecialities = collections.defaultdict(list)

# for row in data:
# 	payment = float(row['Payments'])
# 	listOfSpecialities.setdefault(row['Specialty'], []).append(payment)


# #sums up the payments for each specialty
# specialtyPaymentsSum = {}

# for key, value in listOfSpecialities.items():
# 	specialtyPaymentsSum[key] = (sum(value))

# return specialtyPaymentsSum


def payments_by_specialty(filename):

	data = csv.DictReader(open(filename))

	# creates a dictionary with specialties as keys, and lists of the payments as values
	listOfSpecialities = collections.defaultdict(list)

	for row in data:
		payment = float(row['Payments'])
		listOfSpecialities.setdefault(row['Specialty'], []).append(payment)

	#sums up the payments for each specialty
	specialtyPaymentsSum = {}

	for key, value in listOfSpecialities.items():
		specialtyPaymentsSum[key] = (sum(value))

	return specialtyPaymentsSum

with open('arvadaPayments.csv', 'wb') as outfile:
	writer = csv.writer(outfile)
	paymentList = payments_by_specialty('testArvada.csv')
	writer.writerow(['specialty', 'payments'])

	for key, value in paymentList.items():
		
		row = [key, value]
		writer.writerow(row)






