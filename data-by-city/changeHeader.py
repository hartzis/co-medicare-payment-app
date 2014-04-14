import csv



with open('arvada.csv', 'rb') as f:
	r = csv.reader(f, delimiter=',')
	header = r.next()
	
	header[3] = 'State'
	header[4] = 'Payments'


citiesArray = ['arvada', 'aurora', 'boulder', 'broomfield', 'coloradoSprings', 'denver',
'fortCollins', 'golden', 'greeley', 'highlandsRanch', 'lakewood', 'longmont', 'louisville',
'loveland', 'westminster']

with open('allCities.csv', 'w') as outfile:
	out_csv = csv.writer(outfile)
	out_csv.writerow(header)
	for city in citiesArray:
		filename = city + '.csv'
		f = open(filename)
		f_in = csv.reader(f)
		f_in.next()
		for line in f_in:
			out_csv.writerow(line)
