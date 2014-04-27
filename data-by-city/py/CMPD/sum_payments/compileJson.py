#!/usr/bin/env python

"""
__author__ = 'hartzis'
"""

import csv, json

def main():

    # by Andy Boyle
    # edited by me: hartzis
    # Open the CSV
    cleanedCSV = open( 'allCompiledCities.csv', 'rU' )
    # Change each fieldname to the appropriate field name. I know, so difficult.
    reader = csv.DictReader( cleanedCSV, fieldnames = ( "City","Specialty","Payments" ))
    # Parse the CSV into JSON and save
    outputJSON = open( 'allCitiesPayments.json', 'w')
    print "JSON opened!"
    outputJSON.write('[')
    for row in reader:
        row['Payments'] = float(row['Payments'])
        json.dump( row, outputJSON )
    outputJSON.write(']')
    print "JSON saved!"

if __name__ == '__main__':
    main()