#!/usr/bin/env python

"""
__author__ = 'hartzis'
"""

import csv, json

def main():


    with open('citiesDataCleaned.csv', 'w') as outfile:
        writer = csv.writer(outfile)
        # writer.writerow(header)
        f = csv.reader(open('test.csv', 'r'))
        #remove headers
        rownum = 0
        for row in f:
            if rownum == 0:
                rownum += 1
                continue
            newrow = [row[1],row[2],row[4].replace('$', '').replace(',', '')]
            writer.writerow(newrow)

    # by Andy Boyle
    # edited by me: hartzis
    # Open the CSV
    cleanedCSV = open( 'citiesDataCleaned.csv', 'rU' )
    # Change each fieldname to the appropriate field name. I know, so difficult.
    reader = csv.DictReader( cleanedCSV, fieldnames = ( "Specialty","City","Payments" ))
    # Parse the CSV into JSON and save
    outputJSON = open( 'allCities.json', 'w')
    print "JSON opened!"
    outputJSON.write('[')
    for row in reader:
        row['Payments'] = float(row['Payments'])
        json.dump( row, outputJSON )
    outputJSON.write(']')
    print "JSON saved!"

if __name__ == '__main__':
    main()