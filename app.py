from flask import Flask
import pyodbc
import atexit

app = Flask(__name__)

@app.route('/')
def hello():
    row = cursor.fetchone()
    if row is not None:
        return"<h1>" + str(row[0]) + " " + str(row[1]) + " " + str(row[2]) +"</h1>"
    return "<h1>hello</h1>"

if __name__ == '__main__':

    # connecting to db: https://docs.microsoft.com/en-us/python/api/overview/azure/sql?view=azure-python
    # using pyodbc: https://github.com/mkleehammer/pyodbc/wiki/Getting-started
    server = 'cardistrywebsite.database.windows.net'
    database = 'Cardistry'
    username = 'emmaline01'
    password = 'Password1'   
    driver= '{SQL Server}'

    conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Moves")

    #start app
    app.run(debug=True)

# server exit routine https://stackoverflow.com/questions/30739244/python-flask-shutdown-event-handler
def windowExiting():
    print("closing!")
    conn.close()

atexit.register(windowExiting)