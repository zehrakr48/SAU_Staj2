from google.oauth2 import service_account
import google.generativeai as genai

credentials = service_account.Credentials.from_service_account_file("ft_key.json")

genai.configure(credentials=credentials)
