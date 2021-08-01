from flask import Flask, jsonify, request, json
import pyodbc
import atexit

app = Flask(__name__)

# get the current list of moves and return them as JSON
@app.route('/api', methods=['GET'])
def index():
    cursor.execute("SELECT * FROM Moves ORDER BY id DESC")

    dbRow = cursor.fetchone()
    databaseData = []
    while dbRow is not None:
        currMove = dict()
        currMove["id"] = str(dbRow[0])
        currMove["date"] = str(dbRow[1])
        currMove["name"] = str(dbRow[2])
        databaseData += [currMove]
        dbRow = cursor.fetchone()
    # you can jsonify a list or a dict
    return jsonify(databaseData)

# insert a new move into the database
@app.route('/api/create', methods=['POST'])
def create():
    requestData = request.get_json() #gets body of request as dict
    date = '7/31/2021'
    name = requestData['content']
    difficulty = 2
    cursor.execute(f"INSERT INTO Moves (learn_date, move_name, move_difficulty) VALUES ('{date}', '{name}', {difficulty})")

    conn.commit()

    return {'201': 'Move added successfully'}


@app.route('/')
def hello():
    cursor.execute("SELECT * FROM Moves")

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

    #start app
    app.run(debug=True)

# server exit routine https://stackoverflow.com/questions/30739244/python-flask-shutdown-event-handler
def windowExiting():
    print("closing!")
    conn.close()

atexit.register(windowExiting)