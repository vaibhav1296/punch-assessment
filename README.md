## family tree implementation


This file is a basic family tree implementation in JavaScript

You can add members and relationships and then you can connect two persons with a relationship

Later you can do different queries to know about a persons detail

## Basic Queries

FOR ADDING A PERSON:          add person ***name***

FOR ADDING RELATIONSHIP:      add relationship ***name***

FOR CONNECTION:               connect ***name1*** as ***relationship name*** of ***name2***

FOR COUNT QUERY:              count sons of ***name***

                              count wives of ***name***
                              count daughters of ***name***

FOR FATHER QUERY:             father of ***name***

FOR HUSBAND QUERY:            husband of ***name***


## Sample Inputs

 SAMPLE INPUTS



add person vaibhav

add person vaishali

add person nakul

add person anamika

add person lata

add person sushil sharma

add relationship husband

add relationship father

add relationship son

add relationship daughter

add relationship wife

connect anamika as daughter of sushul sharma

connect anamika as daughter of sushil sharma

connect vaishali as daughter of sushil sharma

connect vaibhav as son of sushil sharma

connect nakul as son of sushil sharma

connect lata as wife of sushil sharma

connect suhsil sharma as husband of lata

connect sushil sharma as husband of lata

print

count daughters of sushil sharma
_Total daughters 2_

count sons of sushil sharma
_Total sons 2_

count wives of sushil sharma
_Total wives 1_

father of nakul
_nakul's father = sushil sharma_

father of vaibhav
_vaibhav's father = sushil sharma_

father of anamika
_anamika's father = sushil sharma_

husband of lata
_lata's husband = sushil sharma_