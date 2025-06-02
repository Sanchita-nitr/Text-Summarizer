# import torch
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from transformers import pipeline
# from fastapi.middleware.cors import CORSMiddleware

# # Load the summarization model
# # model_path = "../Models/models--sshleifer--distilbart-cnn-12-6/snapshots/a4f8f3ea906ed274767e9906dbaede7531d660ff"
# text_summary = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", cache_dir="/app/cache")
# #text_summary = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", device=0)
# # Initialize FastAPI app
# app = FastAPI()

# # Add CORS middleware to allow cross-origin requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allows all origins
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )

# # Define the request body schema
# class SummaryRequest(BaseModel):
#     text: str

# # Define the summarization endpoint
# @app.post("/summarize")
# def summarize(request: SummaryRequest):
#     # Validate input
#     if not request.text.strip():
#         raise HTTPException(status_code=400, detail="Input text cannot be empty.")
    
#     # Generate summary
#     try:
#         output = text_summary(request.text)
#         return {"summary": output[0]["summary_text"]}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")

# # Run the app on port 7860 for Hugging Face Spaces
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=7860)

import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

# ✅ Determine device: GPU (0) if available, otherwise CPU (-1)
device = 0 if torch.cuda.is_available() else -1

# ✅ Load the summarization model with correct usage of cache_dir
text_summary = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device=device
)

# ✅ Initialize FastAPI app
app = FastAPI()

# ✅ Add CORS middleware to allow cross-origin requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Allows all origins – for development use only
    allow_credentials=True,
    allow_methods=["*"],       # Allows all HTTP methods
    allow_headers=["*"],       # Allows all headers
)

# ✅ Define the request body schema
class SummaryRequest(BaseModel):
    text: str

# ✅ Define the summarization endpoint
@app.post("/summarize")
def summarize(request: SummaryRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")
    
    try:
        output = text_summary(request.text)
        return {"summary": output[0]["summary_text"]}
    except Exception as e:
        import traceback
        print("🔥 Error during summarization:", e)  # Log for debugging
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error generating summary: {str(e)}")

# ✅ Run the app on port 7860 (used in your frontend fetch call)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
