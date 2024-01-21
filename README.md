# Cricbuzz Live API Documentation

## Introduction

Greetings to the documentation of the unofficial Cricbuzz Live data fetching API (data sourced through scraping). This API furnishes details about live, recent, and upcoming cricket matches. Seamlessly integrate match scores, specifics, and summaries into your cricket data applications.

## Base URL

The base URL for the API is `https://cricbuzz-live.vercel.app`. All endpoints are relative to this base URL.

## Endpoints

### 1. Get Match Score

#### Endpoint: `/v1/score/{matchId}`

- **Method:** GET
- **Summary:** Get detailed information about a specific match score.
- **Parameters:**
  - `matchId` (path parameter): The ID of the match (integer).
- **Response:**
  - `200 OK`: Successful response with match details.
    - `message`: "Matches data successfully retrieved"
    - `data`: Detailed information about the match, including title, update, live score, and player statistics.

#### Example Request:

```bash
curl -X GET "https://cricbuzz-live.vercel.app/v1/score/12345"
```

#### Example Response:

```json
{
  "message": "Matches data successfully retrieved",
  "data": {
    "title": "MI Emirates vs Gulf Giants, 4th Match - Live Cricket Score",
    "update": "Gulf Giants need 25 runs in 10 balls",
    "liveScore": "GG 155/5 (18.2)",
    "runRate": "{{suggest.tag}}",
    "batsmanOne": "Karim Janat",
    "batsmanOneRun": "0",
    "batsmanOneBall": "(0)",
    "batsmanOneSR": "0",
    "batsmanTwo": "Shimron Hetmyer",
    "batsmanTwoRun": "15",
    "batsmanTwoBall": "(16)",
    "batsmanTwoSR": "93.75",
    "bowlerOne": "Fazalhaq Farooqi",
    "bowlerOneOver": "15",
    "bowlerOneRun": "16",
    "bowlerOneWickets": "0",
    "bowlerOneEconomy": "93.75",
    "bowlerTwo": "Trent Boult",
    "bowlerTwoOver": "O",
    "bowlerTwoRun": "R",
    "bowlerTwoWicket": "W",
    "bowlerTwoEconomy": "ECO"
  }
}
```

### 2. Get Live Matches

#### Endpoint: `/v1/matches/live`

- **Method:** GET
- **Summary:** Get a list of live cricket matches.
- **Parameters:**
  - `type` (query parameter): The type of matches (international(default), league, domestic, women).
- **Response:**
  - `200 OK`: Successful response with live match details.
    - `message`: "Matches data successfully retrieved"
    - `data`: List of live matches with match ID, title, teams, time and place, and overview.

#### Example Request:

```bash
curl -X GET "https://cricbuzz-live.vercel.app/v1/matches/live?type=international"
```

#### Example Response:

```json
{
  "message": "Matches data successfully retrieved",
  "data": {
    "matches": [
      {
        "id": "86529",
        "title": "Sri Lanka U19 vs Zimbabwe U19,",
        "teams": [
          {
            "team": "SLU1..",
            "run": "204 (48.3 Ovs)"
          },
          {
            "team": "ZIMU..",
            "run": "204 (48.3 Ovs)"
          }
        ],
        "timeAndPlace": {
          "date": "Today",
          "time": "&nbsp;•&nbsp;",
          "place": "at Kimberley, Diamond Oval"
        },
        "overview": "Sri Lanka U19 won by 39 runs (DLS method)"
      }
    ]
  }
}
```

### 3. Get Recent Matches

#### Endpoint: `/v1/matches/recent`

- **Method:** GET
- **Summary:** Get a list of recent cricket matches.
- **Parameters:**
  - `type` (query parameter): The type of matches (international(default), league, domestic, women).
- **Response:**
  - `200 OK`: Successful response with recent match details.
    - `message`: "Matches data successfully retrieved"
    - `data`: List of recent matches with match ID, title, teams, time and place, and overview.

#### Example Request:

```bash
curl -X GET "https://cricbuzz-live.vercel.app/v1/matches/recent?type=league"
```

#### Example Response:

```json
{
  "message": "Matches data successfully retrieved",
  "data": {
    "matches": [
      {
        "id": "86529",
        "title": "Sri Lanka U19 vs Zimbabwe U19,",
        "teams": [
          {
            "team": "SLU1..",
            "run": "204 (48.3 Ovs)"
          },
          {
            "team": "ZIMU..",
            "run": "204 (48.3 Ovs)"
          }
        ],
        "timeAndPlace": {
          "date": "Today",
          "time": "&nbsp;•&nbsp;",
          "place": "at Kimberley, Diamond Oval"
        },
        "overview": "Sri Lanka U19 won by 39 runs (DLS method)"
      }
    ]
  }
}
```

### 4. Get Upcoming Matches

#### Endpoint: `/v1/matches/upcoming`

- **Method:** GET
- **Summary:** Get a list of upcoming cricket matches.
- **Parameters:**
  - `type` (query parameter): The type of matches (international(default), league, domestic, women).
- **Response:**
  - `200 OK`: Successful response with upcoming match details.
    - `message`: "Matches data successfully retrieved"
    - `data`: List of upcoming matches with match ID, title, teams, time and place, and overview.

#### Example Request:

```bash
curl -X GET "https://cricbuzz-live.vercel.app/v1/matches/upcoming?type=women"
```

#### Example Response:

```json
{
  "message": "Matches data successfully retrieved",
  "data": {
    "matches": [
      {
        "id": "86529",
        "title": "Sri Lanka U19 vs Zimbabwe U19,",
        "teams": [
          {
            "team": "SLU1..",
            "run": "204 (48.3 Ovs)"
          },
          {
            "team": "ZIMU..",
            "run": "204 (48.3 Ovs)"
          }
        ],
        "timeAndPlace": {
          "date": "Today",
          "time": "&nbsp;•&nbsp;",
          "place": "at Kimberley, Diamond Oval"
        },
        "overview": "Sri Lanka U19 won by 39 runs (DLS method)"
      }
    ]
  }
}
```

