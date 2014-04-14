import csv


with open('arvada.csv', 'rb') as f:
	r = csv.reader(f, delimiter=',')
	header = r.next()
	
	header[3] = 'State'
	header[4] = 'Payments'


with open('testArvada.csv', 'w') as outfile:
	writer = csv.writer(outfile)
	# writer.writerow(header)
	f = csv.reader(open('arvada.csv', 'r'))
	for row in f:
		f.next()
		row[-1]=row[-1].replace('$','').replace(',','')
		writer.writerow(row)
