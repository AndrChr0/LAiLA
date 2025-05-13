# LAiLA, The AI-Powered Assessment System

## Requirements
- NodeJS <br>
- MySQL version 8.0 or higher <br>
- two *.env* files, one in the root of the "server" directory and one in the project's root directory

## Server .env Config
MYSQL_HOST = 'nnn.n.n.n' <br>
MYSQL_USER = 'string' <br>
MYSQL_PASSWORD = 'string' <br>
MYSQL_DATABASE = 'string' <br> <br>
GPT_API_KEY = 'string' (if you want to use chatGPT)<br>
GPT_MODEL = 'string' <br> <br>
ACCESS_TOKEN_SECRET = 'string' <br>
REFRESH_TOKEN_SECRET = 'string' <br> <br>
ANTHROPIC_API_KEY = 'string' (if you want to use claude) <br>
ANTHROPIC_FEEDBACK_MODEL= 'string' <br>
ANTHROPIC_REPORT_MODEL= 'string' 

## Root .env Config
API_PATH = 'string' <br>
API_PORT = nnnn <br>
CORS_PATH = 'string' <br>
CORS_PORT = nnnn

## Considerations
- The project is only designed and tested for local hosting of SQL database

## AI API usage
- You can switch between the API's for assignment report generation in server/utils/generateAssignmentReport.js - line 109
- You can switch between the API's for feedback generation in server/contoller/zipController.js - line 136

