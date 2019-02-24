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


stringToHand : String -> Maybe Hand
stringToHand string =
    case string of
        "GU" ->
            Just Gu

        "CHOKI" ->
            Just Choki

        "PA" ->
            Just Pa

        _ ->
            Nothing


type Issue
    = Win
    | Draw
    | Lose


stringToIssue : String -> Maybe Issue
stringToIssue string =
    case string of
        "WIN" ->
            Just Win

        "DRAW" ->
            Just Draw

        "LOSE" ->
            Just Lose

        _ ->
            Nothing


type alias Model =
    { phase : Phase, error : Bool, player : Hand, enemy : Hand, issue : Issue }


type Msg
    = Janken Hand
    | Reset
    | Finish Model
