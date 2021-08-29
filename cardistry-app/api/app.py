from flask import Flask, jsonify, request, json
import pyodbc
import atexit
from markov import Markov

app = Flask(__name__)

# parses a row from the Moves table into a dictionary
def getDbRowDict(dbRow):
    def getDbEntry(entry):
        if entry is None: return ""
        return str(entry)

    currMove = dict()
    currMove["id"] = getDbEntry(dbRow[0])
    currMove["date"] = getDbEntry(dbRow[1])
    currMove["name"] = getDbEntry(dbRow[2])
    currMove["difficulty"] = getDbEntry(dbRow[3])
    currMove["moveType"] = getDbEntry(dbRow[4])
    currMove["link"] = getDbEntry(dbRow[5])
    currMove["notes"] = getDbEntry(dbRow[6])
    currMove["starting_position"] = getDbEntry(dbRow[7])
    currMove["ending_position"] = getDbEntry(dbRow[8])
    return currMove

# get the current list of moves and return them as JSON
@app.route('/api', methods=['GET'])
def index():
    cursor.execute('''SELECT Moves.id, Moves.learn_date, Moves.move_name, Moves.move_difficulty, MoveTypes.move_type_name, Moves.link, Moves.notes, Moves.start_position, Moves.end_position  
FROM Moves LEFT JOIN MoveTypes 
ON MoveTypes.id = Moves.move_type_id 
ORDER BY Moves.learn_date DESC''')

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
    if (requestData['difficulty'] == "Difficulty"): #if no difficulty was entered
        difficulty = "NULL"
    else:
        difficulty = int(requestData['difficulty'])
    moveType = "'" + requestData['type'] + "'"
    if (moveType == "Type"): #if no type was entered
        moveType = "NULL"
    link = requestData['link']
    notes = requestData['notes']
    startPos = requestData['starting_position']
    endPos = requestData['ending_position']

    # get the MoveTypes table ID form the move type name if it exists
    typeID = None
    if moveType != "NULL":
        cursor.execute(f"SELECT * FROM MoveTypes WHERE move_type_name = {moveType}")
        dbRow = cursor.fetchone()
        if dbRow is not None:
            typeID = dbRow[0]

    print(f"INSERT INTO Moves (learn_date, move_name, move_difficulty, move_type_id, link, notes, start_position, end_position) VALUES ('{date}', '{name}', {difficulty}, {typeID}, '{link}', '{notes}', '{startPos}', '{endPos}')")
    print()
    if typeID is not None:
        cursor.execute(f"INSERT INTO Moves (learn_date, move_name, move_difficulty, move_type_id, link, notes, start_position, end_position) VALUES ('{date}', '{name}', {difficulty}, {typeID}, '{link}', '{notes}', '{startPos}', '{endPos}')")
    else:
        cursor.execute(f"INSERT INTO Moves (learn_date, move_name, move_difficulty, link, notes, start_position, end_position) VALUES ('{date}', '{name}', {difficulty}, '{link}', '{notes}', '{startPos}', '{endPos}')")

    conn.commit()

    return {'201': 'Move added successfully'}


# edit a move in the database
@app.route('/api/edit', methods=['POST'])
def edit():
    requestData = request.get_json() #gets body of request as dict
    id = int(requestData['id'])
    date = requestData['date']
    name = requestData['name']
    if (requestData['difficulty'] == "Difficulty"): #if no difficulty was entered
        difficulty = "NULL"
    else:
        difficulty = int(requestData['difficulty'])
    moveType = "'" + requestData['type'] + "'"
    if (moveType == "Type"): #if no type was entered
        moveType = "NULL"
    link = requestData['link']
    notes = requestData['notes']
    startPos = requestData['starting_position']
    endPos = requestData['ending_position']

    # get the MoveTypes table ID form the move type name if it exists
    typeID = "NULL"
    if moveType != "NULL":
        cursor.execute(f"SELECT * FROM MoveTypes WHERE move_type_name = {moveType}")
        dbRow = cursor.fetchone()
        if dbRow is not None:
            typeID = dbRow[0]

    cursor.execute(f"UPDATE Moves SET learn_date = '{date}', move_name = '{name}', move_difficulty = {difficulty}, move_type_id = {typeID}, link = '{link}', notes = '{notes}', start_position = '{startPos}', end_position = '{endPos}' WHERE id = {id}")
    conn.commit()

    return {'201': 'Move edited successfully'}

# delete a move in the database
@app.route('/api/delete', methods=['POST'])
def delete():
    requestData = request.get_json() #gets body of request as dict
    id = int(requestData['id'])

    cursor.execute(f"DELETE FROM Moves WHERE id = {id}")
    conn.commit()
    return {'201': 'Move deleted successfully'}

@app.route('/')
def home():
    return "<h1>hello</h1>"

# uses a Markov chain to generate a sequence of moves
@app.route('/api/createRecommendedSeq', methods=['POST'])
def createRecommendedSeq():
    requestData = request.get_json()
    seqDifficulty = int(requestData['target_difficulty'])
    seqLength = int(requestData['target_length'])
    difficultyVariation = int(requestData['difficulty_variation'])
    transitionSmoothness = int(requestData['transition_smoothness'])

    # TODO: fix so table shows up correctly
    # all moves have equal chance of being first TODO: handle target difficulty
    cursor.execute("SELECT * FROM Moves") # TODO: where move type is not magic
    dbRow = cursor.fetchone()
    moveBank = []
    while dbRow is not None:
        currMove = getDbRowDict(dbRow)
        
        moveBank += [currMove]
        dbRow = cursor.fetchone()

    return jsonify(markovRec.createRecommendSeq(seqLength, seqDifficulty, difficultyVariation, transitionSmoothness, moveBank))

# return a sequence already created through the Markov chain
@app.route('/api/getRecommendedSeq', methods=['GET'])
def getRecommendedSeq():
    return jsonify(markovRec.recommendedSeq)

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

    markovRec = Markov()

    #start app
    app.run(debug=True)

# server exit routine https://stackoverflow.com/questions/30739244/python-flask-shutdown-event-handler
def windowExiting():
    print("closing!")
    conn.close()

atexit.register(windowExiting)