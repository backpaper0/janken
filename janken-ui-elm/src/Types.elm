module Types exposing (..)


type Phase
    = Init
    | Started
    | Finished


type Hand
    = Gu
    | Choki
    | Pa


handToString : Hand -> String
handToString hand =
    case hand of
        Gu ->
            "GU"

        Choki ->
            "CHOKI"

        Pa ->
            "PA"


stringToHand : String -> Hand
stringToHand string =
    case string of
        "GU" ->
            Gu

        "CHOKI" ->
            Choki

        "PA" ->
            Pa

        _ ->
            Gu


type Issue
    = Win
    | Draw
    | Lose


stringToIssue : String -> Issue
stringToIssue string =
    case string of
        "WIN" ->
            Win

        "DRAW" ->
            Draw

        "LOSE" ->
            Lose

        _ ->
            Win


type alias Model =
    { phase : Phase, error : Bool, player : Hand, enemy : Hand, issue : Issue }


type Msg
    = Janken Hand
    | Reset
    | Finish Model
