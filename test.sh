#!/bin/bash

myCnt=5

for (( i = 1; i <= $myCnt; i++ )) 
do 
    $(curl 'http://localhost:3000/ping')
done

cnt=$(curl 'http://localhost:3000/cnt')

if echo ${cnt} | jq .pingCnt = $myCnt
then
    echo 'Test done'
else
    echo 'Test crash'
fi
