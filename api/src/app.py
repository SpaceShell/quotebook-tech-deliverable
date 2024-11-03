from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form(), age: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    return quote


@app.get("/data")
async def retrieve_messages(age: str = "lastweek"):
    databaseCopy = {"quotes": []}

    if age == "lastweek":
        comparisonDate = datetime.now() - timedelta(days=7)
    elif age == "lastmonth":
        comparisonDate = datetime.now() - timedelta(days=30)
    elif age == "lastyear":
        comparisonDate = datetime.now() - timedelta(days=365)
    else:
        comparisonDate = datetime(1, 1, 1, 1, 1, 1)

    for quote in database['quotes']:
        quoteDate = datetime.fromisoformat(quote['time'])
        if quoteDate > comparisonDate:
            databaseCopy['quotes'].append(quote)

    return databaseCopy