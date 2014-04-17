#!/usr/bin/env python

"""
__author__ = 'hartzis'
"""

import csv, json

def main():


    with open('citiesDataCleaned.csv', 'w') as outfile:
        writer = csv.writer(outfile)
        # writer.writerow(header)
        f = csv.reader(open('allCities.csv', 'r'))
        #remove headers
        rownum = 0
        for row in f:
            if rownum == 0:
                rownum += 1
                continue
            newrow = [row[1],row[2],row[4].replace('$', '').replace(',', '')]
            writer.writerow(newrow)

    # by Andy Boyle
    # Open the CSV
    f = open( 'citiesDataCleaned.csv', 'rU' )
    # Change each fieldname to the appropriate field name. I know, so difficult.
    reader = csv.DictReader( f, fieldnames = ( "Specialty","City","Payments" ))
    # Parse the CSV into JSON and save
    f = open( 'allCities.json', 'w')
    json.dump( [ row for row in reader ], f )
    print "JSON parsed!"
    print "JSON saved!"

if __name__ == '__main__':
    main()