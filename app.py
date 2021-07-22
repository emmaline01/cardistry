import pyodbc


# connecting to db: https://docs.microsoft.com/en-us/python/api/overview/azure/sql?view=azure-python
# using pyodbc: https://github.com/mkleehammer/pyodbc/wiki/Getting-started
server = 'cardistrywebsite.database.windows.net'
database = 'Cardistry'
username = 'emmaline01'
password = 'Password1'   
driver= '{SQL Server}'

connection = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = connection.cursor()

cursor.execute("INSERT INTO Moves (learn_date, move_name, move_difficulty) VALUES (\'7/21/2021\', \'test\', 1)")
cursor.execute("SELECT * FROM Moves")
row = cursor.fetchone()
while row:
    print (str(row[0]) + " " + str(row[1]) + " " + str(row[2]))
    row = cursor.fetchone()