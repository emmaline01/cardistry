from flask import Flask, jsonify, request, json
import pyodbc
import atexit

app = Flask(__name__)

# parses a row from the database into a dictionary
def getDbRowDict(dbRow):
    def getDbEntry(entry):
        if entry is None: return ""
        return str(entry)

    currMove = dict()
    currMove["date"] = getDbEntry(dbRow[0])
    currMove["name"] = getDbEntry(dbRow[1])
    currMove["difficulty"] = getDbEntry(dbRow[2])
    currMove["moveType"] = getDbEntry(dbRow[3])
    currMove["link"] = getDbEntry(dbRow[4])
    currMove["notes"] = getDbEntry(dbRow[5])
    return currMove

# get the current list of moves and return them as JSON
@app.route('/api', methods=['GET'])
def index():
    cursor.execute('''SELECT Moves.learn_date, Moves.move_name, Moves.move_difficulty, MoveTypes.move_type_name, Moves.link, Moves.notes 
FROM Moves LEFT JOIN MoveTypes 
ON MoveTypes.id = Moves.move_type_id 
ORDER BY Moves.id DESC''')

    dbRow = cursor.fetchone()
    databaseData = []
    while dbRow is not None:
        databaseData += [getDbRowDict(dbRow)]
        dbRow = cursor.fetchone()
    # you can jsonify a list or a dict
    return jsonify(databaseData)

# insert a new move into the database
@app.route('/api/create', methods=['POST'])
def create():
    requestData = request.get_json() #gets body of request as dict
    date = requestData['date']
    name = requestData['name']
    difficulty = int(requestData['difficulty'])
    moveType = requestData['type']
    link = requestData['link']
    notes = requestData['notes']

    # get the MoveTypes table ID form the move type name if it exists
    cursor.execute(f"SELECT * FROM MoveTypes WHERE move_type_name = '{moveType}'")
    dbRow = cursor.fetchone()
    if dbRow is not None:
        typeID = dbRow[0]
    else:
        typeID = None
        print(f"{moveType} type not found")

    if typeID is not None:
        cursor.execute(f"INSERT INTO Moves (learn_date, move_name, move_difficulty, move_type_id, link, notes) VALUES ('{date}', '{name}', {difficulty}, {typeID}, '{link}', '{notes}')")
    else:
        cursor.execute(f"INSERT INTO Moves (learn_date, move_name, move_difficulty, link, notes) VALUES ('{date}', '{name}', {difficulty}, '{link}', '{notes}')")

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