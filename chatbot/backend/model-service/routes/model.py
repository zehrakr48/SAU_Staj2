from flask import Blueprint, request, make_response, jsonify
from google.generativeai.types import HarmCategory, HarmBlockThreshold

import json

from utils import genai
from utils import config
from utils import session

from models import Info

model_bp = Blueprint("model", __name__)

files_uploaded = []

genai.configure(api_key=config.gemini_key)


def start_train():
    print("Training of model successfully started!")

# @model_bp.route("/model/train", methods=["POST"])
# def train_model():

#     base_model = [
#         m
#         for m in genai.list_models()
#         if "createTunedModel" in m.supported_generation_methods
#     ][0]

#     infos = session.query(Info).all()

#     train_set = []
#     process_set = []
#     for info in infos:
#         if info.title is None:
#             process_set.append(info)
#         else:
#             train_set.append({"text_input": info.title, "output": info.text})

#     model = T5ForConditionalGeneration.from_pretrained("./dataset-parser")
#     tokenizer = T5Tokenizer.from_pretrained("./dataset-parser")

#     for data in process_set:
#         context = data.text
#         input_text = f"generate question: {context}"

#         inputs = tokenizer(
#             input_text, return_tensors="pt", max_length=512, truncation=True
#         )

#         outputs = model.generate(
#             input_ids=inputs["input_ids"],
#             attention_mask=inputs["attention_mask"],
#             max_length=128,
#         )

#         generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
#         parts = generated_text.split(" answer> ", 1)

#         question = parts[0].strip()
#         answer = parts[1].strip()

#         train_set.append({"text_input": question, "output": answer})

#     fine_tune = genai.create_tuned_model(
#         source_model=base_model.name,
#         training_data=train_set,
#         id=config.model_name,
#         epoch_count=10,
#         batch_size=4,
#         learning_rate=0.001,
#     )

#     notifier_thread = threading.Thread(target=start_train)
#     notifier_thread.start()

#     fine_tune_results = fine_tune.result(timeout=7200)
#     return make_response(jsonify({"message": "Model trained successfully!"}), 200)


@model_bp.route("/model", methods=["POST"])
def get_model_reply():
    json_data = request.data.decode("utf-8")
    data = json.loads(json_data)
    newMessage = data["message"]
    conversation = data["conversationHistory"]

    for i, message in enumerate(conversation):
        if i % 2 == 0:
            conversation[i] = {"role": "user", "parts": [message["text"]]}
        else:
            conversation[i] = {"role": "model", "parts": [message["text"]]}

    # model = genai.GenerativeModel(f"tunedModels/{config.model_name}")

    base_model = [
        m
        for m in genai.list_models()
        if "createTunedModel" in m.supported_generation_methods
    ][1]
    model = genai.GenerativeModel(base_model.name)
    chat = model.start_chat(history=conversation)
    result = chat.send_message(
        [*files_uploaded, newMessage],
        safety_settings={
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
    )
    if result.parts:
        print(result.text)
        response_message = {"reply": result.text}
        return make_response(jsonify(response_message), 200)
    else:
        print("No valid parts in the response.")
        for candidate in result.candidates:
            print(f"Candidate: {candidate}")
            print(f"Safety Ratings: {candidate.safety_ratings}")
        response_message = {"errorMessage": "No valid parts in the response."}
        return make_response(jsonify(response_message), 400)
