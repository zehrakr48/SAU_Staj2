import json
import os

with open("../dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    f.close()

convertedData = []
for instance in data:
    convertedData.append({"role": "user", "parts": [instance["text_input"]]})
    convertedData.append({"role": "model", "parts": [instance["output"]]})

with open("../conversation.json", "w", encoding="utf-8") as json_file:
    json.dump(convertedData, json_file, indent=4, ensure_ascii=False)
    json_file.close()
