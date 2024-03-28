#!/bin/bash

# All databases
DATABASES="gostyle_db gostyle_jobs gostyle_app-db"
SQL_STMT=""
# Iterate through databases
for db in $DATABASES; do
    SQL_STMT+="CREATE DATABASE IF NOT EXISTS \`${db}\` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;"$'\n'
    SQL_STMT+="CREATE USER '${db}'@'%' IDENTIFIED BY '${db}';"$'\n'
    SQL_STMT+="GRANT ALL PRIVILEGES ON \`${db}\`.* to '${db}'@'%';"$'\n'
done

echo $SQL_STMT