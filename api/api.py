from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse  # Add JSONResponse here
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from processing_input import pipeline_text_processing
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou bien préciser l'origine de l'application Express
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-text", response_class=JSONResponse)
async def process_text(text_input: str = Form(...)):
    fichier_source = 'data_lemondefr/lemonde_articles.csv'
    fichier_traduit = 'traduction_sortie.csv'
    processed_text=pipeline_text_processing(text_input, fichier_source, fichier_traduit)
    return {"claims": processed_text}


# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=2000)
