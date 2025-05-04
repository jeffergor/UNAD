from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("text", "").lower()

    # Respuestas simples por palabras clave
    if "hola" in user_input:
        response = "Hola, buenos días. ¿Cómo estás? ¿En qué te puedo ayudar?"
    elif "gracias" in user_input:
        response = "¡De nada! Estoy aquí para ayudarte."
    elif "documento" in user_input:
        response = "¿Qué deseas hacer con el documento? Puedo ayudarte a clasificarlo, resumirlo o almacenarlo."
    elif "adiós" in user_input or "hasta luego" in user_input:
        response = "Hasta luego. ¡Que tengas un excelente día!"
    else:
        response = "Lo siento, no entendí bien. ¿Podrías reformularlo o ser más específico?"

    return jsonify({"message": response})

@app.route("/classify", methods=["POST"])
def classify():
    return jsonify({"message": "Clasificación automática realizada con éxito."})

@app.route("/summarize", methods=["POST"])
def summarize():
    return jsonify({"message": "Resumen automático generado."})

@app.route("/backup", methods=["POST"])
def backup():
    return jsonify({"message": "Base de datos respaldada correctamente."})

if __name__ == "__main__":
    app.run(debug=True)
