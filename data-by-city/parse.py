import csv

citiesArray = ['arvada', 'aurora', 'boulder', 'broomfield', 'coloradoSprings', 'denver',
	'fortCollins', 'golden', 'greeley', 'highlandsRanch', 'lakewood', 'longmont', 'louisville',
	'loveland', 'westminster']

def csvFormatter(filename, output_filename):

	opened_file = open(filename, 'rb')

	inTxt = csv.reader(open(filename,'rb'), delimiter="\t")
	outCSV = csv.writer(open(output_filename,'wb'))

	outCSV.writerows(inTxt)


def main():

	for city in citiesArray:
		filename = city + '.txt'
		output_filename = city + '.csv'

		csvFormatter(filename, output_filename)



if __name__ == '__main__':
	main()