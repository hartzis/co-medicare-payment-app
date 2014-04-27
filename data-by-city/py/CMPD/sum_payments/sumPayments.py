import csv
import collections


citiesArray = ['arvada', 'aurora', 'boulder', 'broomfield', 'denver',
	'fortCollins', 'golden', 'greeley', 'highlandsRanch', 'lakewood', 'longmont', 'louisville',
	'loveland', 'westminster']


def main():

	with open('allCompiledCities.csv', 'wb') as finaloutfile:

		finalWriter = csv.writer(finaloutfile)

		for city in citiesArray:
			
			incsv = city + '.csv'
			outcsv = city+'Cleaned.csv'
			finalOut = city+'Payments.csv'
			print incsv
			print outcsv


			with open(outcsv, 'w') as outfile:
				writer = csv.writer(outfile)
				# writer.writerow(header)
				f = csv.reader(open(incsv, 'r'))
				for row in f:
					
					row[-1]=row[-1].replace('$','').replace(',','')
					writer.writerow(row)
			

			paymentList = payments_by_specialty(outcsv)
			for key, value in paymentList.items():
				row = [city, key, value]
				finalWriter.writerow(row)




def payments_by_specialty(filename):

	data = csv.DictReader(open(filename))

	# creates a dictionary with specialties as keys, and lists of the payments as values
	listOfSpecialities = collections.defaultdict(list)

	for row in data:
		payment = float(row['Total Medicare payments'])
		listOfSpecialities.setdefault(row['Specialty'], []).append(payment)

	#sums up the payments for each specialty
	specialtyPaymentsSum = {}

	for key, value in listOfSpecialities.items():
		specialtyPaymentsSum[key] = (sum(value))

	return specialtyPaymentsSum





if __name__ == '__main__':
	main()