# Use an official Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Set the Hugging Face cache directory
ENV HF_HOME=/app/cache

# Create the cache directory and set permissions
RUN mkdir -p /app/cache && chmod -R 777 /app/cache

# Copy the requirements file first
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application file directly
COPY textsummary.py /app/

# Expose the port for FastAPI
EXPOSE 7860

# Run the FastAPI app
CMD ["uvicorn", "textsummary:app", "--host", "0.0.0.0", "--port", "7860"]